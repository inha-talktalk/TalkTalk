package com.inha.server.oauth.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class ClientToken {

  private String access_token;
  private String refresh_token;
}
