package com.inha.server.chatGPT.model;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Getter
@Document("script")
public class Script {

    @Id
    String id;

    String type;

    String language;

    List<ScriptMap> scripts;

    @Getter
    @AllArgsConstructor
    public static class ScriptMap {

        String text;
        String mp3Uri;
    }
}