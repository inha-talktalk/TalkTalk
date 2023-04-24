package com.inha.server.user.model;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "user")
public class User {

    private final Long kakaoId;
    private final String email;
    private final String name;
    private final String nickname;
    private final String password;
    private final String profileImage;
    private final LocalDateTime joinTime;
    @Id
    private String id;
}