package com.inha.server.study.self.model;

import com.inha.server.chatGPT.model.Script.ScriptMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "self-study")
public class SelfStudy {
    @Id
    private String id;

    private String userId;
    private String selfStudyName;
    private String selfStudyType;
    private String scriptId;
    @Builder.Default
    private List<String> tags = new ArrayList<>();
    @Builder.Default
    private List<?> answers = new ArrayList<>();

    private String createdAt;
    private String finishedAt;

    public void finishSelfStudyRead (List<ScriptMap> answers, String finishedAt) {
        this.selfStudyType = "read";
        this.answers = answers;
        this.finishedAt = finishedAt;
    }
}