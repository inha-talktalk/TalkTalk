package com.inha.server.study.self.dto.reponse;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class ScriptDto {
    private String scriptId;
    private Map<String, String> scripts;
}
