package com.inha.server.study.self.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EndSelfStudyWriteReq {
    private String selfStudyId;
    private List<ScriptText> answers;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ScriptText {
        String text;
    }
}
