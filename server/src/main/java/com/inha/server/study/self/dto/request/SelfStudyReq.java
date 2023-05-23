package com.inha.server.study.self.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SelfStudyReq {
    private String selfStudyName;
    private String scriptId;
    private List<String> tags;
}