package com.inha.server.oauth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SocialUserDto {
    private Long id;
    private String nickname;
    private String email;
}
