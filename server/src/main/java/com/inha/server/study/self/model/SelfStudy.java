package com.inha.server.study.self.model;

import com.inha.server.chatGPT.model.Script.ScriptMap;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
    private List<ScriptMap> answers = new ArrayList<>();

    private String createdAt;
    private String finishedAt;
}