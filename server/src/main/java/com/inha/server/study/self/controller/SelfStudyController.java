package com.inha.server.study.self.controller;

import com.inha.server.study.self.dto.reponse.SelfStudyCreateRes;
import com.inha.server.study.self.dto.reponse.SelfStudyGetRes;
import com.inha.server.study.self.dto.reponse.SelfStudyScriptRes;
import com.inha.server.study.self.dto.request.EndSelfStudyReadReq;
import com.inha.server.study.self.dto.request.EndSelfStudyWriteReq;
import com.inha.server.study.self.dto.request.SelfStudyReq;
import com.inha.server.study.self.service.SelfStudyService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<SelfStudyScriptRes> GetScript(
        @RequestHeader(value = "x-access-token") String jwt,
        @RequestParam(name = "languageId") String languageId,
        @RequestParam(name = "type") String type) {

        return selfStudyService.getScript(languageId, type, jwt);
    }

    @PostMapping("/start")
    public ResponseEntity<SelfStudyCreateRes> startSelfStudy(
        @RequestHeader(value = "x-access-token") String jwt,
        @RequestBody SelfStudyReq selfStudyReq) {
        return selfStudyService.startSelfStudy(selfStudyReq, jwt);
    }

    @PostMapping("/read")
    public ResponseEntity<?> endRead(@RequestHeader(value = "x-access-token") String jwt,
        @ModelAttribute EndSelfStudyReadReq req)
        throws ParseException, IOException {
        return selfStudyService.endReadTest(req, jwt);
    }

    @PostMapping("/write")
    public ResponseEntity<?> endWrite(@RequestHeader(value = "x-access-token") String jwt,
        @RequestBody EndSelfStudyWriteReq endSelfStudyWriteReq) {
        return selfStudyService.endWrite(endSelfStudyWriteReq, jwt);
    }

    @DeleteMapping("/{selfStudyId}")
    public ResponseEntity<?> deleteSelfStudy(@RequestHeader(value = "x-access-token") String jwt,
        @PathVariable(name = "selfStudyId") String selfStudyId) {
        return selfStudyService.deleteSelfStudy(selfStudyId, jwt);
    }

    @GetMapping("/{selfStudyId}")
    public ResponseEntity<SelfStudyGetRes> getSelfStudy(
        @PathVariable(name = "selfStudyId") String selfStudyId) {
        return selfStudyService.getSelfStudy(selfStudyId);
    }
}
