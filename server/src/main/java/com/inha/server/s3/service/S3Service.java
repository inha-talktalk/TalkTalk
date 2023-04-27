package com.inha.server.s3.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.inha.server.user.util.TokenProvider;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    public String bucket;

    private static String getUserId(String jwt) {
        String userId = TokenProvider.getSubject(jwt);

        if (userId == null) {
            throw new IllegalStateException("존재하지 않는 사용자입니다.");
        }
        return userId;
    }

    public String upload(MultipartFile multipartFile, String dirName, String jwt)
        throws IOException {
        File uploadFile = convert(multipartFile)        // 파일 생성
            .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File convert fail"));

        return upload(uploadFile, dirName, getUserId(jwt));
    }

    private String upload(File uploadFile, String dirName, String userId) {
        String fileName = dirName + "/" + userId + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);    // s3로 업로드
        removeNewFile(uploadFile);
        return uploadImageUrl;
    }

    // 1. 로컬에 파일생성
    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }

        return Optional.empty();
    }

    // 2. S3에 파일업로드
    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(
            CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // 3. 로컬에 생성된 파일삭제
    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            return;
        }
    }

    // 버킷의 파일 삭제
    public void delete(String fileName) {
        amazonS3Client.deleteObject(bucket, fileName);
    }
}
