package com.inha.server.study.self.dto.reponse;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class SelfStudySimpleListRes {
    private String userId;
    private String selfStudyType;
    private String selfStudyName;
    private List<String> tags;
    private String createdAt;
    private String finishedAt;
    private List<?> answers;
}
