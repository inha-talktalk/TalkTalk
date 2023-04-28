package com.inha.server.mypage.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileNameAndNicknameReq {

    private String userName;
    private String nickName;
}