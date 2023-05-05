package com.inha.server.study.group.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDelegateRes {

  private String originOwnerId;
  private String changedOwnerId;
}
