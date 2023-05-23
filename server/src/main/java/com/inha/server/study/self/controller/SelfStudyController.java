package com.inha.server.study.self.controller;

import com.inha.server.chatGPT.dto.request.ScriptReq;
import com.inha.server.study.self.dto.reponse.SelfStudyScriptRes;
import com.inha.server.study.self.dto.request.SelfStudyReq;
import com.inha.server.study.self.dto.request.SelfStudyScriptReq;
import com.inha.server.study.self.service.SelfStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/self-study")
public class SelfStudyController {

    private final SelfStudyService selfStudyService;

    @GetMapping()
    public ResponseEntity<SelfStudyScriptRes> GetScript(@RequestHeader(value = "x-access-token") String jwt,
        @RequestBody SelfStudyScriptReq selfStudyScriptReq) {

        return selfStudyService.getScript(selfStudyScriptReq.getLanguageId(), selfStudyScriptReq.getType(), jwt);
    }

    @PostMapping("/start")
    public HttpStatus startSelfStudy(@RequestBody SelfStudyReq selfStudyReq) {
        return selfStudyService.startSelfStudy(selfStudyReq);
    }
}
