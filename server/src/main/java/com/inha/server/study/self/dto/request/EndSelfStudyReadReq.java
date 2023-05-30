package com.inha.server.study.self.dto.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EndSelfStudyReadReq {

    List<MultipartFile> fileList;
    private String selfStudyId;
    private String textList;
}