package com.inha.server.study.language.controller;

import com.inha.server.study.language.enumtype.language;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/language")
public class LanguageController {
    @GetMapping()
    public language[] getLanguage() {
        language[] languages = language.values();

        return languages;
    }
}