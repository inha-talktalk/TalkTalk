package com.inha.server.oauth;

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
