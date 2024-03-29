package com.inha.server.study.self.model;

import com.inha.server.chatGPT.model.Script.ScriptMap;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@Document(collection = "self-study")
public class SelfStudy {
    @Id
    private String id;

    private String userId;
    private String languageId;
    private String selfStudyName;
    private String selfStudyType;
    private String scriptId;
    @Builder.Default
    private List<String> tags = new ArrayList<>();
    @Builder.Default
    private List<?> answers = new ArrayList<>();

    private String createdAt;
    private String finishedAt;
    @Builder.Default
    private Boolean isFinished = false;

    public void finishSelfStudyRead(List<ScriptMap> answers, String finishedAt) {
        this.selfStudyType = "read";
        this.answers = answers;
        this.finishedAt = finishedAt;
        this.isFinished = true;
    }

    public void finishSelfStudyWrite(List<String> answers, String finishedAt) {
        this.selfStudyType = "write";
        this.answers = answers;
        this.finishedAt = finishedAt;
        this.isFinished = true;
    }
}