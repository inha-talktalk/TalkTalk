package com.inha.server.language.service;

import com.inha.server.language.dto.response.LanguageDto;
import com.inha.server.language.enumtype.language;
import com.inha.server.language.model.Language;
import com.inha.server.language.repository.LanguageRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LanguageService {

    private final LanguageRepository languageRepository;

    public List<LanguageDto> getLanguages() {
        List<LanguageDto> languageDtoList = new ArrayList<>();

        List<Language> languageList = languageRepository.findAll();
        for (Language l : languageList) {
            languageDtoList.add(
                LanguageDto.builder()
                    .label(l.getName())
                    .id(l.getId())
                    .build()
            );
        }

        return languageDtoList;
    }

    public String getLanguageName(String id) {
        Language language = languageRepository.findById(id).get();
        return language.getName();
    }

    public String getTTS(String id) {
        Language language = languageRepository.findById(id).get();
        return language.getTts();
    }

    public void updateLanguages() {
        language[] languages = language.values();

        for (language lan : languages) {
            Language language = languageRepository.findByName(lan.getLabel()).orElse(null);
            if (language == null) {
                languageRepository.save(Language.builder()
                    .name(lan.getLabel())
                    .stt(lan.getStt())
                    .tts(lan.getTts())
                    .build());
                continue;
            }
            language.setSttAndTts(lan.getStt(), lan.getTts());
            languageRepository.save(language);
        }
    }
}
