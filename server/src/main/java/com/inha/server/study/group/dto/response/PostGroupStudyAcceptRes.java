package com.inha.server.study.group.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostGroupStudyAcceptRes {

  private String groupId;
  private List<String> studyMate;
}
