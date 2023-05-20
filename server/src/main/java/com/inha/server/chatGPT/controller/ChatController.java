package com.inha.server.chatGPT.controller;

import com.inha.server.chatGPT.dto.request.ChatReq;
import com.inha.server.chatGPT.dto.response.ChatRes;
import com.inha.server.chatGPT.service.ScriptService;
import com.inha.server.language.service.LanguageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@RequestMapping("/chat")
@RestController
public class ChatController {

    private final ScriptService scriptService;
    private final LanguageService languageService;

    @Qualifier("openaiRestTemplate")
    @Autowired
    private RestTemplate restTemplate;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiUrl;

    @PostMapping("/{type}/{num}")
    public HttpStatus chat(@PathVariable String type, @PathVariable Integer num,
        @RequestParam String languageId) {
        String prompt = scriptService.makePrompt(languageService.getLanguageName(languageId), type);

        ChatReq request = new ChatReq(model, prompt, num);

        // api 호출
        ChatRes response = restTemplate.postForObject(apiUrl, request, ChatRes.class);

        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            return HttpStatus.BAD_REQUEST;
        }

        scriptService.makeScript(response.getChoices(), type, languageId);

        return HttpStatus.OK;
    }
}
