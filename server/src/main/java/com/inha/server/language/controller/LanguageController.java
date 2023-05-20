package com.inha.server.language.controller;

import com.inha.server.language.dto.response.LanguageDto;
import com.inha.server.language.dto.response.ScriptTypeDto;
import com.inha.server.language.service.LanguageService;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LanguageController {

    private final LanguageService languageService;

    @GetMapping("/language")
    public ResponseEntity<List<LanguageDto>> getLanguage() {
        return new ResponseEntity<>(languageService.getLanguages(), HttpStatus.OK);
    }

    @PatchMapping("/language/update")
    public HttpStatus updateLanguage() {
        languageService.updateLanguages();
        return HttpStatus.OK;
    }

    @GetMapping("/script-type")
    public List<ScriptTypeDto>  getScript() {
        List<ScriptTypeDto> scriptType = new ArrayList<>();

        scriptType.add(
                new ScriptTypeDto("대화문", "dialog")
        );
        scriptType.add(
                new ScriptTypeDto("줄글", "prose")
        );

        return scriptType;
    }
}