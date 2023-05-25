package com.inha.server.study.self.dto.reponse;

import com.inha.server.chatGPT.model.Script.ScriptMap;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SelfStudyGetRes {

    private String userId;
    private String selfStudyType;
    private String scriptType;
    private String selfStudyName;
    private List<String> tags;
    private String createdAt;
    private String finishedAt;
    private List<ScriptMap> scripts;
    private List<?> answers;
}
