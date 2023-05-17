package com.inha.server.study.self.controller;

import com.inha.server.study.self.dto.reponse.ScriptDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/self-study")
public class SelfStudyController {

    @GetMapping()
    public ScriptDto GetScript(@RequestParam(name = "languageId") Integer languageId, @RequestParam(name = "type") String type) {
        Map<String, String> scripts = new LinkedHashMap<>();

        scripts.put("Hello student.", "https://inha-talktalk.s3.ap-northeast-2.amazonaws.com/clova1684048155309");
        scripts.put("I wanna go home.", "https://inha-talktalk.s3.ap-northeast-2.amazonaws.com/clova1684048259773");
        scripts.put("Did you done homework?", "https://inha-talktalk.s3.ap-northeast-2.amazonaws.com/clova1684285913617");
        scripts.put("I will do tomorrow.", "https://inha-talktalk.s3.ap-northeast-2.amazonaws.com/clova1684285998862");
        scripts.put("See you next week.", "https://inha-talktalk.s3.ap-northeast-2.amazonaws.com/clova1684286341266");
        scripts.put("Bye teacher.", "https://inha-talktalk.s3.ap-northeast-2.amazonaws.com/clova1684286376009");

        return ScriptDto.builder()
                .scriptId("dfjksdjflak32iji2")
                .scripts(scripts)
                .build();
    }
}
