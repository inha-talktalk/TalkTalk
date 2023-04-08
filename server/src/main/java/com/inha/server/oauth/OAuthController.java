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

    private final KakaoApiClient kakaoApiClient;

    @GetMapping("/kakao")
    public ClientToken kakaoCallback(@RequestParam String code) {
        return kakaoApiClient.requestAccessToken(code);
    }
}