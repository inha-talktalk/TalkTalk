package com.inha.server.study.self.dto.reponse;

import com.inha.server.chatGPT.model.Script.ScriptMap;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ScriptDto {

    private String scriptId;
    private List<ScriptMap> scripts;
}
