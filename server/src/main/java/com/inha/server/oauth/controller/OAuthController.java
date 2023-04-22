package com.inha.server.oauth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.inha.server.oauth.dto.JwtDto;
import com.inha.server.oauth.service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class OAuthController {

  private final OAuthService oAuthService;

  @PostMapping("/kakao")
  public JwtDto kakaoLongin(@RequestParam String code) throws JsonProcessingException {
    return oAuthService.kakaoLogin(code);
  }
}