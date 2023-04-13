package com.inha.server.user.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
public class User {

    @Id
    private String id;

    private int kakaoId;
    private String email;
    private String nickname;
    private String password;

    private String profileImage;
}