package com.inha.server.study.group.service;

import com.inha.server.study.group.dto.request.PostGeneralChatReq;
import com.inha.server.study.group.model.GeneralChat;
import com.inha.server.study.group.model.GeneralContent;
import com.inha.server.study.group.model.GroupStudy;
import com.inha.server.study.group.repository.GeneralChatRepository;
import com.inha.server.study.group.repository.GroupStudyRepository;
import com.inha.server.user.util.TokenProvider;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final GeneralChatRepository generalChatRepository;
    private final GroupStudyRepository groupStudyRepository;

    @Transactional
    public ResponseEntity<Flux<GeneralChat>> getGeneralChatList(String jwt, String groupStudyId) {
        String userId = getUserId(jwt);
        GroupStudy groupStudy = groupStudyRepository.findById(groupStudyId).orElse(null);
        if (userId == null || groupStudy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<String> studyMate = groupStudy.getStudyMate();

        if (!studyMate.contains(userId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(generalChatRepository.findByGroupId(groupStudyId)
            .subscribeOn(Schedulers.boundedElastic()), HttpStatus.OK);
    }

    private static String getUserId(String jwt) {
        return TokenProvider.getSubject(jwt);
    }

    @Transactional
    public ResponseEntity<Mono<GeneralChat>> postGeneralChat(String jwt, String groupStudyId,
        PostGeneralChatReq req) {
        String userId = getUserId(jwt);
        GroupStudy groupStudy = groupStudyRepository.findById(groupStudyId).orElse(null);

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        formatter.setTimeZone(TimeZone.getTimeZone("UTC"));

        if (userId == null || groupStudy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<String> studyMate = groupStudy.getStudyMate();
        if (!studyMate.contains(userId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        GeneralChat generalChat = GeneralChat.builder()
            .groupId(groupStudyId)
            .senderId(userId)
            .content(GeneralContent.builder()
                .message(req.getMessage())
                .build())
            .createdAt(formatter.format(new Date()))
            .build();

        return new ResponseEntity<>(generalChatRepository.save(generalChat), HttpStatus.CREATED);
    }
}
