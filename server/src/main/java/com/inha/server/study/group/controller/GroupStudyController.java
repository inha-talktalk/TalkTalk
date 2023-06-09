package com.inha.server.study.group.controller;

import com.inha.server.study.group.dto.request.PostGroupStudyReq;
import com.inha.server.study.group.dto.response.GetGroupStudyInfoRes;
import com.inha.server.study.group.dto.response.GetGroupStudyListRes;
import com.inha.server.study.group.dto.response.GetGroupStudyPostDetailRes;
import com.inha.server.study.group.dto.response.GetSelfStudySharedListRes;
import com.inha.server.study.group.dto.response.PostDelegateRes;
import com.inha.server.study.group.dto.response.PostGroupStudyAcceptRes;
import com.inha.server.study.group.dto.response.PostGroupStudyEndRes;
import com.inha.server.study.group.dto.response.PostGroupStudyQuitRes;
import com.inha.server.study.group.dto.response.PostGroupStudyRes;
import com.inha.server.study.group.dto.response.WaitingListRes;
import com.inha.server.study.group.service.GroupStudyService;
import com.inha.server.study.self.model.SelfStudyShare;
import com.inha.server.user.util.TokenProvider;
import java.util.List;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
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
public class GroupStudyController {

    private final GroupStudyService groupStudyService;

    @PostMapping("")
    public ResponseEntity<PostGroupStudyRes> create(
        @RequestHeader(value = "x-access-token") String jwt,
        @RequestBody PostGroupStudyReq request) {
        if (TokenProvider.getSubject(jwt) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return groupStudyService.create(jwt, request);
    }

    @GetMapping("/list")
    public ResponseEntity<GetGroupStudyListRes> read(
        @PageableDefault(size = 5, sort = "createdAt", direction = Direction.ASC) Pageable pageable) {
        return groupStudyService.getGroupStudyList(pageable);
    }

    @GetMapping("/search")
    public ResponseEntity<GetGroupStudyListRes> search(
        @RequestParam String keyword,
        @PageableDefault(size = 5, sort = "createdAt", direction = Direction.ASC) Pageable pageable) {
        return groupStudyService.search(keyword, pageable);
    }

    @GetMapping("")
    public ResponseEntity<GetGroupStudyPostDetailRes> read(
        @RequestHeader(value = "x-access-token") String jwt,
        @RequestParam(value = "groupStudyId") String groupStudyId) {
        if (TokenProvider.getSubject(jwt) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return groupStudyService.getGroupStudyDetail(groupStudyId);
    }

    @PostMapping("/end")
    public ResponseEntity<PostGroupStudyEndRes> end(
        @RequestHeader(value = "x-access-token") String jwt,
        @RequestParam(value = "groupStudyId") String groupStudyId) {
        if (TokenProvider.getSubject(jwt) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return groupStudyService.end(jwt, groupStudyId);
    }

    @PostMapping("/apply")
    public ResponseEntity<WaitingListRes> apply(@RequestHeader(value = "x-access-token") String jwt,
        @RequestParam(value = "groupStudyId") String groupStudyId) {
        if (TokenProvider.getSubject(jwt) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return groupStudyService.apply(jwt, groupStudyId);
    }

    @GetMapping("/waiting-list")
    public ResponseEntity<WaitingListRes> readWaitingList(
        @RequestHeader(value = "x-access-token") String jwt,
        @RequestParam(value = "groupStudyId") String groupStudyId) {
        if (TokenProvider.getSubject(jwt) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return groupStudyService.readWaitingList(jwt, groupStudyId);
    }

    @PostMapping("/approve")
    public ResponseEntity<PostGroupStudyAcceptRes> approve(
        @RequestHeader(value = "x-access-token") String jwt,
        @RequestParam(value = "groupStudyId") String groupStudyId,
        @RequestParam(value = "userId") String userId) {
        if (TokenProvider.getSubject(jwt) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return groupStudyService.approve(jwt, groupStudyId, userId);
    }

    @PostMapping("/delegate")
    public ResponseEntity<PostDelegateRes> delegate(
        @RequestHeader(value = "x-access-token") String jwt,
        @RequestParam(value = "groupStudyId") String groupStudyId,
        @RequestParam(value = "to") String changedOwnerId) {
        if (TokenProvider.getSubject(jwt) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return groupStudyService.delegate(jwt, groupStudyId, changedOwnerId);
    }

    @PostMapping("/quit")
    public ResponseEntity<PostGroupStudyQuitRes> quit(
        @RequestHeader(value = "x-access-token") String jwt,
        @RequestParam(value = "groupStudyId") String groupStudyId) {
        if (TokenProvider.getSubject(jwt) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return groupStudyService.quit(jwt, groupStudyId);
    }

    @GetMapping("/info")
    public ResponseEntity<GetGroupStudyInfoRes> readInfo(
        @RequestHeader(value = "x-access-token") String jwt,
        @RequestParam(value = "groupStudyId") String groupStudyId) {
        if (TokenProvider.getSubject(jwt) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return groupStudyService.readInfo(groupStudyId);
    }

    @GetMapping("/{groupStudyId}/share-chat")
    public ResponseEntity<List<SelfStudyShare>> getSharedSelfStudyList(@PathVariable(name = "groupStudyId") String groupStudyId) {
        return groupStudyService.getSharedSelfStudyList(groupStudyId);
    }

    @GetMapping("/{groupStudyId}/share-chat/test")
    public ResponseEntity<GetSelfStudySharedListRes> getSharedSelfStudyListTest(
        @PathVariable(name = "groupStudyId") String groupStudyId,
        @RequestParam(value = "after", defaultValue = "null") String afterId,
        @RequestParam(value = "before", defaultValue = "null") String beforeId,
        @RequestParam(value = "size", defaultValue = "5") Integer size
    ) {
        return groupStudyService.getSharedSelfStudyListTest(groupStudyId, afterId, beforeId, size);
    }
}
