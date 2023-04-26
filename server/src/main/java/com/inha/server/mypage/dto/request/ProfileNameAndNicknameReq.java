package com.inha.server.mypage.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProfileNameAndNicknameReq {

    private final String userName;
    private final String nickName;
}