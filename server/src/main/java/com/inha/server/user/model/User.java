package com.inha.server.user.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "user")
public class User {

    @Id
    private String id;

    private final Long kakaoId;
    private final String email;
    private String name;
    private String nickname;
    private final String password;
    private String profileImage;
    private final String joinTime;
    @Builder.Default
    private List<String> languageList = new ArrayList<>();

    public void setNameAndNickname(String name, String nickname) {
        this.name = name;
        this.nickname = nickname;
    }

    public void setImgURI(String imgURI) {
        this.profileImage = imgURI;
    }
}