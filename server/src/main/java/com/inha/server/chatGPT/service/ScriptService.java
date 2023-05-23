package com.inha.server.chatGPT.service;

import com.inha.server.chatGPT.dto.response.ChatRes.Choice;
import com.inha.server.chatGPT.model.Script;
import com.inha.server.chatGPT.model.Script.ScriptMap;
import com.inha.server.chatGPT.repository.ScriptRepository;
import com.inha.server.clova.service.ClovaService;
import com.inha.server.language.service.LanguageService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScriptService {

    private final ScriptRepository scriptRepository;
    private final ClovaService clovaService;
    private final LanguageService languageService;

    public void makeScript(List<Choice> choices, String type, String languageId) {
        String language = languageService.getTTS(languageId);

        int tap = 6;
        if (type.equals("prose")) {
            tap = 3;
        }

        for (Choice choice : choices) {
            String[] contents = choice.getMessage().getContent().split("\n");
            List<ScriptMap> scriptMapList = new ArrayList<>();

            for (int i = 0; i < contents.length; i++) {
                if (contents[i].equals("")) {
                    continue;
                }
                String prompt = contents[i].substring(tap);
                scriptMapList.add(
                    new ScriptMap(prompt, clovaService.executeTTS(prompt, type, language)));
            }

            scriptRepository.save(
                Script.builder()
                    .type(type)
                    .language(languageId)
                    .scripts(scriptMapList)
                    .build());
        }
    }

    public String makePrompt(String languageName, String type) {
        String makeType = "대화문";
        if (type.equals("prose")) {
            makeType = "짧은글";
        }
        return languageName + "로 " + makeType + " 6줄";
    }
}
