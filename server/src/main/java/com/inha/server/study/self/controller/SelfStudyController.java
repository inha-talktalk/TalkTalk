package com.inha.server.study.self.controller;

import com.inha.server.study.self.dto.reponse.SelfStudyCreateRes;
import com.inha.server.study.self.dto.reponse.SelfStudyGetListRes;
import com.inha.server.study.self.dto.reponse.SelfStudyGetRes;
import com.inha.server.study.self.dto.reponse.SelfStudyScriptRes;
import com.inha.server.study.self.dto.request.EndSelfStudyReadReq;
import com.inha.server.study.self.dto.request.EndSelfStudyWriteReq;
import com.inha.server.study.self.dto.request.SelfStudyReq;
import com.inha.server.study.self.service.SelfStudyService;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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
        return selfStudyService.endRead(req, jwt);
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

    @GetMapping("/list")
    public ResponseEntity<SelfStudyGetListRes> getSelfStudyList(
            @RequestHeader(value = "x-access-token") String jwt,
            @PageableDefault(size = 5, sort = "createdAt") Pageable pageable) {
        return selfStudyService.getSelfStudyList(jwt, pageable);
    }

    @PostMapping("/{selfStudyId}")
    public ResponseEntity<HttpStatus> postShare(
        @RequestHeader(value = "x-access-token") String jwt,
        @PathVariable(name = "selfStudyId") String selfStudyId,
        @RequestParam(name = "to") String groupId) {
        return selfStudyService.postSare(jwt ,selfStudyId, groupId);
    }
}
