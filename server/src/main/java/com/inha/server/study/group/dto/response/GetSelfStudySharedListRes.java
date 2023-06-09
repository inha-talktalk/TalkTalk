package com.inha.server.study.group.dto.response;

import com.inha.server.study.self.model.SelfStudyShare;
import java.util.stream.Stream;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetSelfStudySharedListRes {
    Stream<SelfStudyShare> selfStudyList;

    @Builder.Default
    boolean finished = false;
}
