package com.inha.server.oauth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.inha.server.oauth.dto.JwtDto;
import com.inha.server.oauth.service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
  public ResponseEntity<JwtDto> kakaoLongin(@RequestParam String code)
      throws JsonProcessingException {
    String jwt = oAuthService.kakaoLogin(code);
    return new ResponseEntity<>(new JwtDto(jwt), generateHeader(jwt), HttpStatus.OK);
  }

  private HttpHeaders generateHeader(String jwt) {
    HttpHeaders headers = new HttpHeaders();
    headers.add("x-access-token", jwt);
    return headers;
  }
}