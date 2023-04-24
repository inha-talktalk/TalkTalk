package com.inha.server.study.group.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostGroupStudyRes {

  private String ownerId;
  private String groupId;
}
