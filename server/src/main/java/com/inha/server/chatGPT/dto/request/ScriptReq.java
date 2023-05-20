package com.inha.server.chatGPT.dto.request;

import lombok.Getter;

@Getter
public class ScriptReq {
    String type;
    String languageId;
    Integer num;
}
