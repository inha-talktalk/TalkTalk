package com.inha.server.study.self.model;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "self-study-share")
public class SelfStudyShare {
    @Id
    private String id;

    private String userName;
    private String profileImage;
    private String selfStudyId;
    private String selfStudyName;
    private List<String> tags;
    private String sharedAt;
    private String createdAt;
    private String finishedAt;
}
