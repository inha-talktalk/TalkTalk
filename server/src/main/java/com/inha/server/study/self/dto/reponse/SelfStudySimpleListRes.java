package com.inha.server.study.self.dto.reponse;

import com.inha.server.chatGPT.model.Script.ScriptMap;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class SelfStudySimpleListRes {
    private String userId;
    private String scriptId;
    private String selfStudyType;
    private String selfStudyName;
    private List<String> tags;
    private List<ScriptMap> script;
    private String createdAt;
    private String finishedAt;
    private List<?> answers;

    public void setScript (List<ScriptMap> script) {
        this.script = script;
    }
}
