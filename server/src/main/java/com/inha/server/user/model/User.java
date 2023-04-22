package com.inha.server.user.model;

import java.time.LocalDateTime;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document(collection = "user")
public class User {
  @Id
  private String id;
  private final Long kakaoId;
  private final String email;
  private final String name;
  private final String nickname;
  private final String password;
  private final String profileImage;
  private final LocalDateTime joinTime;

  public User(Long kakaoId, String name, String email, String nickname, String password, String profileImage,
      LocalDateTime joinTime) {
    this.kakaoId = kakaoId;
    this.email = email;
    this.name = name;
    this.nickname = nickname;
    this.password = password;
    this.profileImage = profileImage;
    this.joinTime = joinTime;
  }
}