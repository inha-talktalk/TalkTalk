package com.inha.server.study.group.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostGroupStudyEndRes {

  private String groupStudyId;
  private Boolean isFinished;
}
