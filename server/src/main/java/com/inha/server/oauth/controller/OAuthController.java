package com.inha.server.oauth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.inha.server.oauth.dto.SocialUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class OAuthController {

    private final com.inha.server.oauth.service.OAuthService OAuthService;

    @GetMapping("/kakao")
    public SocialUserDto kakaoLongin(@RequestParam String code) throws JsonProcessingException {
        return OAuthService.kakaoLogin(code);
    }
}