package com.inha.server.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class OAuthController {

    private final OAuthService OAuthService;

    @GetMapping("/kakao")
    public String kakaoLongin(@RequestParam String code) {
        return OAuthService.kakoLogin(code);
    }
}