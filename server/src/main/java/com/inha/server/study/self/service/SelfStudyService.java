package com.inha.server.study.self.service;

import com.inha.server.chatGPT.model.Script;
import com.inha.server.chatGPT.repository.ScriptRepository;
import com.inha.server.study.self.dto.reponse.ScriptDto;
import com.inha.server.user.model.UserScriptList;
import com.inha.server.user.repository.UserScriptRepository;
import com.inha.server.user.util.TokenProvider;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SelfStudyService {

    private final ScriptRepository scriptRepository;
    private final UserScriptRepository userScriptRepository;

    private static String getUserId(String jwt) {
        return TokenProvider.getSubject(jwt);
    }

    public ResponseEntity<ScriptDto> getScript(String languageId, String type, String jwt) {
        List<Script> scriptList = scriptRepository.findAllByLanguageAndType(languageId, type);

        if (scriptList == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<String> scriptIdList = new ArrayList<>();

        for (Script s : scriptList) {
            scriptIdList.add(s.getId());
        }

        String userId = getUserId(jwt);

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
            ScriptDto.builder()
                .scriptId(script.getId())
                .scripts(script.getScripts())
                .build(),
            HttpStatus.OK
        );
    }
}