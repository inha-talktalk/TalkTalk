package com.inha.server.study.self.controller;

import com.inha.server.chatGPT.dto.request.ScriptReq;
import com.inha.server.study.self.dto.reponse.ScriptRes;
import com.inha.server.study.self.service.SelfStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/self-study")
public class SelfStudyController {

    private final SelfStudyService selfStudyService;

    @GetMapping()
    public ResponseEntity<ScriptRes> GetScript(@RequestHeader(value = "x-access-token") String jwt,
        @RequestBody ScriptReq scriptReq) {

        return selfStudyService.getScript(scriptReq.getLanguageId(), scriptReq.getType(), jwt);
    }
}
