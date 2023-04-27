package com.inha.server.study.group.dto.request;

import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostGroupStudyReq {

  private String languageId;
  private String groupName;
  private List<String> tags;
  private Long groupPersonnel;
  private String introduction;
  private LocalDate groupDuration;
}
