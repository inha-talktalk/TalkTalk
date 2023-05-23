package com.inha.server.study.self.dto.request;

import com.inha.server.chatGPT.model.Script.ScriptMap;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EndSelfStudyReadReq {
    private String selfStudyId;
    private List<ScriptMap> answers;
}
