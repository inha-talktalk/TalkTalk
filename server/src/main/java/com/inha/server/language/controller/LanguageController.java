package com.inha.server.language.controller;

import com.inha.server.language.dto.response.LanguageDto;
import com.inha.server.language.service.LanguageService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/language")
public class LanguageController {

    private final LanguageService languageService;

    @GetMapping()
    public ResponseEntity<List<LanguageDto>> getLanguage() {
        return new ResponseEntity<>(languageService.getLanguages(), HttpStatus.OK);
    }

    @PatchMapping("/update")
    public HttpStatus updateLanguage() {
        languageService.updateLanguages();
        return HttpStatus.OK;
    }
}