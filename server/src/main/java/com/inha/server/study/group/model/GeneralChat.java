package com.inha.server.study.group.model;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "general-chat")
public class GeneralChat {

    @Id
    private String id;

    private String groupId;
    private String senderId;
    private String profileImage;
    private GeneralContent content;
    private String createdAt;
}
