package com.inha.server.study.group.service;

import com.inha.server.study.group.dto.request.PostGeneralChatReq;
import com.inha.server.study.group.dto.response.GetGeneralChatListRes;
import com.inha.server.study.group.model.GeneralChat;
import com.inha.server.study.group.model.GeneralContent;
import com.inha.server.study.group.model.GroupStudy;
import com.inha.server.study.group.repository.GeneralChatRepository;
import com.inha.server.study.group.repository.GroupStudyRepository;
import com.inha.server.user.model.User;
import com.inha.server.user.repository.UserRepository;
import com.inha.server.user.util.TokenProvider;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final GeneralChatRepository generalChatRepository;
    private final GroupStudyRepository groupStudyRepository;
    private final UserRepository userRepository;

    @Transactional
    public ResponseEntity<GetGeneralChatListRes> getGeneralChatList(String jwt,
        String groupStudyId,
        Pageable pageable) {
        String userId = getUserId(jwt);
        GroupStudy groupStudy = groupStudyRepository.findById(groupStudyId).orElse(null);

        if (userId == null || groupStudy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<String> studyMate = groupStudy.getStudyMate();
        if (!studyMate.contains(userId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        List<GeneralChat> generalChatList = generalChatRepository.findAllByGroupId(groupStudyId,
            PageRequest.of(pageable.getPageNumber(), pageable.getPageSize())).getContent();

        int totalPage = generalChatRepository.findByGroupId(groupStudyId).size();

        return new ResponseEntity<>(GetGeneralChatListRes.builder()
            .groupStudyList(generalChatList)
            .totalPage((int) Math.ceil(totalPage / 5.0))
            .currentPage(pageable.getPageNumber())
            .build(), HttpStatus.OK);
    }

    private static String getUserId(String jwt) {
        return TokenProvider.getSubject(jwt);
    }

    @Transactional
    public ResponseEntity<GeneralChat> postGeneralChat(String jwt, String groupStudyId,
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

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        GeneralChat generalChat = GeneralChat.builder()
            .groupId(groupStudyId)
            .senderId(userId)
            .profileImage(user.getProfileImage())
            .content(GeneralContent.builder()
                .message(req.getMessage())
                .build())
            .createdAt(formatter.format(new Date()))
            .build();

        generalChatRepository.save(generalChat);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
