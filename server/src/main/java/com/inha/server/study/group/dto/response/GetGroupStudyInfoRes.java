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
public class GetGroupStudyInfoRes {

  private String languageId;
  private String groupName;
  private Long groupPersonnel;
  private List<String> studyMate;
  private List<String> tags;
  private String introduction;
  private String groupDuration;
  private String ownerId;
}
