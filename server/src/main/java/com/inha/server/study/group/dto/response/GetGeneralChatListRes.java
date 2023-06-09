package com.inha.server.study.group.dto.response;

import com.inha.server.study.group.model.GeneralChat;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetGeneralChatListRes {

    private List<GeneralChat> groupStudyList;
    private Integer totalPage;
    private Integer currentPage;
}
