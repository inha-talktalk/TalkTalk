package com.inha.server.study.self.dto.reponse;

import com.inha.server.chatGPT.model.Script.ScriptMap;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class SelfStudyScriptRes {

    private String scriptId;
    private List<ScriptMap> scripts;
}
