package com.inha.server.study.self.dto.request;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SelfStudyReq {
    private String selfStudyName;
    private String scriptId;
    private List<String> tags;
}