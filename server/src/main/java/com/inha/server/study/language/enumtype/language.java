package com.inha.server.study.language.enumtype;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
@AllArgsConstructor
public enum language {
    English("영어", 1),
    Chinese("중국어", 2),
    Japanese("일본어", 3);

    private final String label;
    private final Integer id;
}
