package com.inha.server.user.model;

import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "user-script-list")
public class UserScriptList {
    @Id
    private String id;

    private String userId;
    private String languageId;

    @Builder.Default
    private List<String> dialogList = new ArrayList<>();
    @Builder.Default
    private List<String> proseList = new ArrayList<>();
}