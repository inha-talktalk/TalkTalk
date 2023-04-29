package com.inha.server.mypage.dto.response;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AchievementRes {
    private int teamMateCount;
    private int studyLanguageCount;
    private LocalDate joinTime;
    private int completedSelfStudyCount;
}
