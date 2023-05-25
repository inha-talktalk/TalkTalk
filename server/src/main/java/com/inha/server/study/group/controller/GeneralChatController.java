package com.inha.server.study.group.controller;

import com.inha.server.study.group.dto.request.PostGeneralChatReq;
import com.inha.server.study.group.model.GeneralChat;
import com.inha.server.study.group.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/group-study")
public class GeneralChatController {

    private final ChatService chatService;

    @CrossOrigin
    @PostMapping(value = "/{groupStudyId}/general-chat")
    public ResponseEntity<Mono<GeneralChat>> createGeneralChat(
        @RequestHeader(value = "x-access-token") String jwt,
        @PathVariable String groupStudyId,
        @RequestBody PostGeneralChatReq req) {
        return chatService.postGeneralChat(jwt, groupStudyId, req);
    }

    @CrossOrigin
    @GetMapping(value = "/{groupStudyId}/general-chat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<Flux<GeneralChat>> read(
        @RequestHeader(value = "x-access-token") String jwt,
        @PathVariable String groupStudyId) {
        return chatService.getGeneralChatList(jwt, groupStudyId);
    }
}
