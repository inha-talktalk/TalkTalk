package com.inha.server.mypage.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder

@Getter
@AllArgsConstructor
@JsonPropertyOrder({"userName", "nickName", "email", "profileIconUrl"})
public class ProfileInfoRes {

    @JsonProperty("userName")
    private String userName;
    @JsonProperty("nickName")
    private String nickName;
    @JsonProperty("email")
    private String email;
    @JsonProperty("profileIconUrl")
    private String profileIconUrl;
}
