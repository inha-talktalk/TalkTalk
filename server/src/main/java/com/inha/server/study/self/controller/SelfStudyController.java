package com.inha.server.study.self.controller;

import com.inha.server.study.self.dto.reponse.SelfStudyCreateRes;
import com.inha.server.study.self.dto.reponse.SelfStudyScriptRes;
import com.inha.server.study.self.dto.request.EndSelfStudyReadReq;
import com.inha.server.study.self.dto.request.EndSelfStudyWriteReq;
import com.inha.server.study.self.dto.request.SelfStudyReq;
import com.inha.server.study.self.service.SelfStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/self-study")
public class SelfStudyController {

    private final SelfStudyService selfStudyService;

    @GetMapping()
    public ResponseEntity<SelfStudyScriptRes> GetScript(@RequestHeader(value = "x-access-token") String jwt,
                                                        @RequestParam(name = "languageId") String languageId,
                                                        @RequestParam(name = "type") String type) {

        return selfStudyService.getScript(languageId, type, jwt);
    }

    @PostMapping("/start")
    public ResponseEntity<SelfStudyCreateRes> startSelfStudy(@RequestHeader(value = "x-access-token") String jwt,
                                                             @RequestBody SelfStudyReq selfStudyReq) {
        return selfStudyService.startSelfStudy(selfStudyReq, jwt);
    }

    @PostMapping("/read")
    public ResponseEntity<?> endRead(@RequestHeader(value = "x-access-token") String jwt,
                                     @RequestBody EndSelfStudyReadReq endSelfStudyReadReq) {
        return selfStudyService.endRead(endSelfStudyReadReq, jwt);
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
}
