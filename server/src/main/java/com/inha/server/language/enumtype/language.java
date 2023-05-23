package com.inha.server.language.enumtype;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
@AllArgsConstructor
public enum language {
    English("영어", "en-US", "clara"),
    Chinese("중국어", "zh-CN", "meimei"),
    Japanese("일본어", "jp-JP", "ntomoko");

    private final String label;
    private final String stt;
    private final String tts;
}