package com.inha.server.mypage.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AchievementRes {

    private int teamMateCount;
    private int studyLanguageCount;
    private String joinTime;
    private int completedSelfStudyCount;
}
