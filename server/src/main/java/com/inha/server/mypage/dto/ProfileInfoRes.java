package com.inha.server.mypage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder

@Getter
@AllArgsConstructor
public class ProfileInfoRes {

    private String userName;
    private String nickName;
    private String email;
    private String profileIconUrl;
}
