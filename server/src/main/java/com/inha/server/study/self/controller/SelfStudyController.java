package com.inha.server.study.self.controller;

import com.inha.server.study.self.dto.reponse.ScriptDto;
import com.inha.server.study.self.service.SelfStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
    public ResponseEntity<ScriptDto> GetScript(@RequestHeader(value = "x-access-token") String jwt,
        @RequestParam(name = "languageId") String languageId,
        @RequestParam(name = "type") String type) {

        return selfStudyService.getScript(languageId, type, jwt);
    }
}
