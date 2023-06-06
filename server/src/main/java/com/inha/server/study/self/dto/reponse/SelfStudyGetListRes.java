package com.inha.server.study.self.dto.reponse;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class SelfStudyGetListRes {
    List<SelfStudySimpleListRes> selfStudyList;
    private Integer totalPage;
    private Integer currentPage;
}
