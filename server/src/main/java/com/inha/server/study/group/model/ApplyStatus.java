package com.inha.server.study.group.model;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "apply-status")
public class ApplyStatus {

    @Id
    private String id;
    private String groupId;
    private String userId;
    @Builder.Default
    private boolean accepted = false;

    public void toggleStatus() {
        this.accepted = true;
    }
}