package com.inha.server.oauth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class OAuthUserDto {

  private Long id;
  private String name;
  private String email;
  private String profileImage;
}
