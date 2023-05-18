package com.inha.server.chatGPT.dto.request;

import com.inha.server.chatGPT.dto.Message;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;

@Getter
public class ChatReq {

    private String model;
    private List<Message> messages;
    private Integer n;

    public ChatReq(String model, String prompt, Integer n) {
        this.model = model;

        this.messages = new ArrayList<>();
        this.messages.add(new Message("user", prompt));
        this.n = n;
    }
}