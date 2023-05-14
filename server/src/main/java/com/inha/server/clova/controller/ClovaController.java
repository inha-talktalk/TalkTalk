package com.inha.server.clova.controller;

import com.inha.server.clova.service.ClovaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ClovaController {
    private final ClovaService clovaService;

    @GetMapping("/clova")
    public void tts(@RequestParam String prompt) {
        clovaService.executeTTS(prompt);
    }

}