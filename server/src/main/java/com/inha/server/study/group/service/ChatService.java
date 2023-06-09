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
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.TimeZone;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<GetGeneralChatListRes> getGeneralChatList(String jwt, String groupStudyId,
        String after, String before, Integer size) {
        String userId = getUserId(jwt);
        GroupStudy groupStudy = groupStudyRepository.findById(groupStudyId).orElse(null);

        if (userId == null || groupStudy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<String> studyMate = groupStudy.getStudyMate();
        if (!studyMate.contains(userId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        List<GeneralChat> generalChatList = generalChatRepository.findByGroupId(groupStudyId);

        if (Objects.equals(before, "") && Objects.equals(after, "")) {
            return new ResponseEntity<>(GetGeneralChatListRes.builder()
                .generalChatList(generalChatList.subList(0, size))
                .isFinished(true)
                .build(), HttpStatus.OK);
        }

        if (!Objects.equals(before, "")) {
            int cutOffIndex = -1;
            for (int i = 0; i < generalChatList.size(); i++) {
                GeneralChat chat = generalChatList.get(i);
                if (chat.getId().equals(before)) {
                    cutOffIndex = i;
                    break;
                }
            }
            if (cutOffIndex != -1) {
                if (cutOffIndex - size <= 0) {
                    if (cutOffIndex == 0) {
                        return new ResponseEntity<>(GetGeneralChatListRes.builder()
                            .generalChatList(Collections.emptyList())
                            .isFinished(true)
                            .build(),
                            HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>(GetGeneralChatListRes.builder()
                            .generalChatList(generalChatList.subList(0, cutOffIndex))
                            .isFinished(true)
                            .build(),
                            HttpStatus.OK);
                    }
                } else {
                    return new ResponseEntity<>(GetGeneralChatListRes.builder()
                        .generalChatList(
                            generalChatList.subList(cutOffIndex - size, cutOffIndex))
                        .isFinished(false)
                        .build(),
                        HttpStatus.OK);
                }
            }
        }

        if (!Objects.equals(after, "")) {
            int cutOffIndex = -1;
            for (int i = 0; i < generalChatList.size(); i++) {
                GeneralChat chat = generalChatList.get(i);
                if (chat.getId().equals(after)) {
                    cutOffIndex = i;
                    break;
                }
            }
            if (cutOffIndex != -1) {
                if (cutOffIndex + size >= generalChatList.size() - 1) {
                    if (cutOffIndex == generalChatList.size() - 1) {
                        return new ResponseEntity<>(GetGeneralChatListRes.builder()
                            .generalChatList(Collections.emptyList())
                            .isFinished(true)
                            .build(),
                            HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>(GetGeneralChatListRes.builder()
                            .generalChatList(
                                generalChatList.subList(cutOffIndex + 1, generalChatList.size()))
                            .isFinished(true)
                            .build(),
                            HttpStatus.OK);
                    }
                } else {
                    return new ResponseEntity<>(GetGeneralChatListRes.builder()
                        .generalChatList(
                            generalChatList.subList(cutOffIndex + 1, cutOffIndex + size + 1))
                        .isFinished(false)
                        .build(),
                        HttpStatus.OK);
                }
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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
            .senderName(user.getName())
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
