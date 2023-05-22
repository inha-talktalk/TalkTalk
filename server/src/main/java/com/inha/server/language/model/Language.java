package com.inha.server.language.model;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Getter
@Document(collection = "language")
public class Language {

    @Id
    private String id;

    private String name;
    private String tts;
    private String stt;

    public void setSttAndTts(String stt, String tts) {
        this.stt = stt;
        this.tts = tts;
    }
}
