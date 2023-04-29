package com.inha.server.mypage.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MyStudiesRes {
    private String groupId;
    private String groupName;
    private List<String> tags;
}
