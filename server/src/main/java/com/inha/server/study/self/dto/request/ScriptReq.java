package com.inha.server.study.self.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ScriptReq {
    private String languageId;
    private String type;
}
