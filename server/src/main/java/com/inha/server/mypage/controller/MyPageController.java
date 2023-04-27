package com.inha.server.mypage.controller;

import com.inha.server.mypage.dto.request.ProfileNameAndNicknameReq;
import com.inha.server.mypage.dto.response.ProfileInfoRes;
import com.inha.server.mypage.service.MyPageService;
import com.inha.server.s3.service.S3Service;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class MyPageController {

    private final S3Service s3Service;
    private final MyPageService myPageService;

    /*
     * 회원 정보를 가지고 옴
     * @param jwt 사용자 정보 인증
     * @PathVariable userId 조회하고자 하는 사용자의 id
     * */
    @GetMapping("/profile/{userId}")
    public ResponseEntity<ProfileInfoRes> getProfileInfo(@PathVariable String userId) {
        return myPageService.getProfile(userId);
    }

    /*
     * 이름과 닉네임을 수정
     * @param jwt 사용자 정보 인증
     * @RequestBody profileReq 변경하려는 정보
     * */
    @PatchMapping("/profile")
    public HttpStatus updateProfileNameAndNickname(
        @RequestHeader(value = "x-access-token") String jwt,
        @RequestBody ProfileNameAndNicknameReq profileReq) {

        return myPageService.updateProfileNameAndNickname(jwt, profileReq);
    }

    /*
     * 프로필 이미지를 수정
     * @param jwt 사용자 정보 인증
     * @RequestParam uploadImg 변경하려는 이미지 MultipartFile
     * */
    @PostMapping("/profile/img")
    public HttpStatus updateProfileImg(
        @RequestHeader(value = "x-access-token") String jwt,
        @RequestPart("imgFile") MultipartFile uploadImg) throws IOException {

        String updateImageURI = s3Service.upload(uploadImg, "profileImg", jwt);

        return myPageService.updateProfileImg(jwt, updateImageURI);
    }
}