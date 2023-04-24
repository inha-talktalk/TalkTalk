package com.inha.server.mypage.controller;

import com.inha.server.mypage.dto.ProfileInfoRes;
import com.inha.server.mypage.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class MayPageController {

    private final MyPageService myPageService;

    /*
     * 회원 정보를 가지고 옴
     * @param jwt 사용자 정보 인증
     * @param userId 조회하고자 하는 사용자의 id
     * */
    @GetMapping("/profile")
    public ProfileInfoRes getProfileInfo(@RequestHeader(value = "x-access-token") String jwt,
        @RequestParam String userId) {
        return myPageService.getProfile(jwt, userId);
    }
}