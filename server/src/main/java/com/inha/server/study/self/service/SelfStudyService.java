package com.inha.server.study.self.service;

import com.inha.server.chatGPT.model.Script;
import com.inha.server.chatGPT.repository.ScriptRepository;
import com.inha.server.study.self.dto.reponse.SelfStudyScriptRes;
import com.inha.server.study.self.dto.request.EndSelfStudyReadReq;
import com.inha.server.study.self.dto.request.EndSelfStudyWriteReq;
import com.inha.server.study.self.dto.request.SelfStudyReq;
import com.inha.server.study.self.model.SelfStudy;
import com.inha.server.study.self.repository.SelfStudyRepository;
import com.inha.server.user.model.UserScriptList;
import com.inha.server.user.repository.UserScriptRepository;
import com.inha.server.user.util.TokenProvider;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SelfStudyService {

    private final ScriptRepository scriptRepository;
    private final UserScriptRepository userScriptRepository;
    private final SelfStudyRepository selfStudyRepository;

    private static String getUserId(String jwt) {
        return TokenProvider.getSubject(jwt);
    }

    public ResponseEntity<SelfStudyScriptRes> getScript(String languageId, String type, String jwt) {
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
                    .userId("644a75e5e94501032bcd97bc")
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

    public HttpStatus startSelfStudy(SelfStudyReq selfStudyReq) {
        String userId = "644a75e5e94501032bcd97bc";

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        formatter.setTimeZone(TimeZone.getTimeZone("UTC"));

        selfStudyRepository.save(
            SelfStudy.builder()
                .userId(userId)
                .selfStudyName(selfStudyReq.getSelfStudyName())
                .scriptId(selfStudyReq.getScriptId())
                .tags(selfStudyReq.getTags())
                .createdAt(formatter.format(new Date()))
                .build()
        );

        return HttpStatus.OK;
    }

    public HttpStatus endRead(EndSelfStudyReadReq endSelfStudyReadReq) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        formatter.setTimeZone(TimeZone.getTimeZone("UTC"));

        SelfStudy study = selfStudyRepository.findById(endSelfStudyReadReq.getSelfStudyId()).get();

        study.finishSelfStudyRead(endSelfStudyReadReq.getScriptMapList(),formatter.format(new Date()));

        selfStudyRepository.save(study);

        return HttpStatus.OK;
    }

    public HttpStatus endWrite(EndSelfStudyWriteReq endSelfStudyWriteReq) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        formatter.setTimeZone(TimeZone.getTimeZone("UTC"));

        SelfStudy study = selfStudyRepository.findById(endSelfStudyWriteReq.getSelfStudyId()).get();

        study.finishSelfStudyWrite(endSelfStudyWriteReq.getScriptTextList(),formatter.format(new Date()));

        selfStudyRepository.save(study);

        return HttpStatus.OK;
    }
}