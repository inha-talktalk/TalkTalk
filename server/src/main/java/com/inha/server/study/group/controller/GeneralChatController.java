package com.inha.server.study.group.controller;

import com.inha.server.study.group.dto.request.PostGeneralChatReq;
import com.inha.server.study.group.dto.response.GetGeneralChatListRes;
import com.inha.server.study.group.model.GeneralChat;
import com.inha.server.study.group.service.ChatService;
import com.inha.server.user.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/group-study")
public class GeneralChatController {

    private final ChatService chatService;

    @PostMapping(value = "/{groupStudyId}/general-chat")
    public ResponseEntity<GeneralChat> createGeneralChat(
        @RequestHeader(value = "x-access-token") String jwt,
        @PathVariable String groupStudyId,
        @RequestBody PostGeneralChatReq req) {
        if (TokenProvider.getSubject(jwt) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return chatService.postGeneralChat(jwt, groupStudyId, req);
    }

    @GetMapping(value = "/{groupStudyId}/general-chat")
    public ResponseEntity<GetGeneralChatListRes> read(
        @RequestHeader(value = "x-access-token") String jwt,
        @PathVariable String groupStudyId,
        @RequestParam String after, @RequestParam String before, @RequestParam Integer size) {
        if (TokenProvider.getSubject(jwt) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return chatService.getGeneralChatList(jwt, groupStudyId, after, before, size);
    }
}
