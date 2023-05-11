package com.inha.server.study.group.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "group-study")
public class GroupStudy {

    @Id
    private String id;

    private String ownerId;
    private String languageId;
    private String groupName;
    private List<String> tags;
    private Long groupPersonnel;
    private String introduction;
    private List<String> studyMate;

    @Builder.Default
    private String state = "ongoing";

    @Builder.Default
    private List<String> waitingList = Collections.emptyList();


    @Builder.Default
    private Boolean isFinished = false;

    @Builder.Default
    private String createdAt = LocalDate.now().format(DateTimeFormatter.ISO_DATE);

    @Builder.Default
    private String groupDuration = LocalDate.of(9999, 12, 31).format(DateTimeFormatter.ISO_DATE);

    public void changeStudyState() {
        this.state = "done";
    }

    public void changeStudyIsFinished() {
        this.isFinished = true;
    }

    public void changeStudyOwner(String userId) {
        this.ownerId = userId;
    }
}
