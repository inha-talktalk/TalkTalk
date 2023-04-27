package com.inha.server.s3.controller;

import com.inha.server.s3.service.S3Service;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/upload")
public class S3Controller {

    private final S3Service s3Service;

    @PostMapping("/img")
    public String uploadImg(@RequestHeader(value = "x-access-token") String jwt,
        @RequestParam("imgFile") MultipartFile uploadImg, String dirName)
        throws IOException {
        return s3Service.upload(uploadImg, dirName, jwt);
    }
}
