package com.inha.server.study.self.service;

import com.inha.server.chatGPT.model.Script;
import com.inha.server.chatGPT.model.Script.ScriptMap;
import com.inha.server.chatGPT.repository.ScriptRepository;
import com.inha.server.s3.service.S3Service;
import com.inha.server.study.self.dto.reponse.SelfStudyCreateRes;
import com.inha.server.study.self.dto.reponse.SelfStudyGetRes;
import com.inha.server.study.self.dto.reponse.SelfStudyScriptRes;
import com.inha.server.study.self.dto.request.EndSelfStudyReadReq;
import com.inha.server.study.self.dto.request.EndSelfStudyWriteReq;
import com.inha.server.study.self.dto.request.SelfStudyReq;
import com.inha.server.study.self.model.SelfStudy;
import com.inha.server.study.self.repository.SelfStudyRepository;
import com.inha.server.user.model.UserScriptList;
import com.inha.server.user.repository.UserScriptRepository;
import com.inha.server.user.service.UserService;
import com.inha.server.user.util.TokenProvider;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SelfStudyService {

    private final UserService userService;
    private final S3Service s3Service;
    private final ScriptRepository scriptRepository;
    private final UserScriptRepository userScriptRepository;
    private final SelfStudyRepository selfStudyRepository;

    private static String getUserId(String jwt) {
        String userId;
        try {
            userId = TokenProvider.getSubject(jwt);
        } catch (Exception e) {
            return null;
        }
        return userId;
    }

    private static String getTime() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        formatter.setTimeZone(TimeZone.getTimeZone("UTC"));

        return formatter.format(new Date());
    }

    public ResponseEntity<?> deleteSelfStudy(String selfStudyId, String jwt) {
        String userId = getUserId(jwt);

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        SelfStudy study = selfStudyRepository.findById(selfStudyId).orElse(null);

        if (study == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (!userId.equals(study.getUserId()) || study.getIsFinished()) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        selfStudyRepository.delete(study);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity<SelfStudyScriptRes> getScript(String languageId, String type,
        String jwt) {
        List<Script> scriptList = scriptRepository.findAllByLanguageAndType(languageId, type);

        if (scriptList == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<String> scriptIdList = new ArrayList<>();

        for (Script s : scriptList) {
            scriptIdList.add(s.getId());
        }

        String userId = getUserId(jwt);

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        UserScriptList userScriptList = userScriptRepository.findByUserIdAndLanguageId(userId,
            languageId).orElse(null);

        if (userScriptList == null) {
            userScriptList = userScriptRepository.save(
                UserScriptList.builder()
                    .userId(userId)
                    .languageId(languageId)
                    .build()
            );
        }

        if (type.equals("dialog")) {
            scriptIdList.removeAll(userScriptList.getDialogList());
        } else {
            scriptIdList.removeAll(userScriptList.getProseList());
        }

        String scriptId = scriptIdList.get(0);

        Script script = scriptRepository.findById(scriptId).get();

        return new ResponseEntity<>(
            SelfStudyScriptRes.builder()
                .scriptId(script.getId())
                .scripts(script.getScripts())
                .build(),
            HttpStatus.OK
        );
    }

    public ResponseEntity<SelfStudyCreateRes> startSelfStudy(SelfStudyReq selfStudyReq,
        String jwt) {
        String userId = getUserId(jwt);

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Script script = scriptRepository.findById(selfStudyReq.getScriptId()).orElse(null);

        if (script == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        SelfStudy selfStudy = selfStudyRepository.save(
            SelfStudy.builder()
                .userId(userId)
                .languageId(script.getLanguage())
                .selfStudyName(selfStudyReq.getSelfStudyName())
                .scriptId(selfStudyReq.getScriptId())
                .tags(selfStudyReq.getTags())
                .createdAt(getTime())
                .build()
        );

        SelfStudyCreateRes.builder()
            .selfStudyId(selfStudy.getId())
            .build();

        return new ResponseEntity<>(
            SelfStudyCreateRes.builder()
                .selfStudyId(selfStudy.getId())
                .build(),
            HttpStatus.OK);
    }

    public ResponseEntity<?> endReadTest(EndSelfStudyReadReq req, String jwt)
        throws ParseException, IOException {
        String userId = getUserId(jwt);

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        SelfStudy study = selfStudyRepository.findById(req.getSelfStudyId())
            .orElse(null);

        if (study == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        JSONParser jp = new JSONParser();

        JSONArray ja = (JSONArray) jp.parse(req.getTextList());

        List<String> textList = new ArrayList<>();

        for (int i = 0; i < ja.size(); i++) {
            textList.add((String) ja.get(i));
        }

        List<ScriptMap> answers = new ArrayList<>();

        for (int i = 0; i < req.getFileList().size(); i++) {
            answers.add(
                new ScriptMap(
                    textList.get(i),
                    s3Service.upload(req.getFileList().get(i), "stt", jwt)
                )
            );
        }

        study.finishSelfStudyRead(answers, getTime());

        selfStudyRepository.save(study);

        userService.addLanguage(userId, study.getLanguageId());

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    public ResponseEntity<?> endWrite(EndSelfStudyWriteReq endSelfStudyWriteReq, String jwt) {
        String userId = getUserId(jwt);

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        SelfStudy study = selfStudyRepository.findById(endSelfStudyWriteReq.getSelfStudyId())
            .orElse(null);

        if (study == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        study.finishSelfStudyWrite(endSelfStudyWriteReq.getAnswers(), getTime());

        selfStudyRepository.save(study);

        userService.addLanguage(userId, study.getLanguageId());

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    public int getSelfStudyCount(String userId) {
        List<SelfStudy> selfStudyList = selfStudyRepository.findAllByUserId(userId);
        int count = selfStudyList.size();
        for (SelfStudy study : selfStudyList) {
            if (study.getIsFinished()) {
                continue;
            }
            count--;
        }

        return count;
    }
    public ResponseEntity<SelfStudyGetRes> getSelfStudy(String selfStudyId) {

        SelfStudy study = selfStudyRepository.findById(selfStudyId).orElse(null);

        if (study == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Script script = scriptRepository.findById(study.getScriptId()).orElse(null);

        if (script == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(
            SelfStudyGetRes.builder()
                .userId(study.getUserId())
                .selfStudyType(study.getSelfStudyType())
                .scriptType(script.getType())
                .selfStudyName(study.getSelfStudyName())
                .tags(study.getTags())
                .createdAt(study.getCreatedAt())
                .finishedAt(study.getFinishedAt())
                .scripts(script.getScripts())
                .answers(study.getAnswers())
                .build(),
            HttpStatus.OK
        );
    }
}