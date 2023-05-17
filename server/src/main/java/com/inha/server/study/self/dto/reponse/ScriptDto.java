package com.inha.server.study.self.dto.reponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
@Builder
public class ScriptDto {
    private String scriptId;
    private List<Script> scripts;

    @AllArgsConstructor
    @Getter
    public static class Script {
        private String text;
        private String mp3Uri;
    }
}
