package com.inha.server.study.group.service;

import com.inha.server.study.group.dto.request.PostGroupStudyReq;
import com.inha.server.study.group.dto.response.GetGroupStudyInfoRes;
import com.inha.server.study.group.dto.response.GetGroupStudyListRes;
import com.inha.server.study.group.dto.response.GetGroupStudyPostDetailRes;
import com.inha.server.study.group.dto.response.GroupStudyRes;
import com.inha.server.study.group.dto.response.PostDelegateRes;
import com.inha.server.study.group.dto.response.PostGroupStudyAcceptRes;
import com.inha.server.study.group.dto.response.PostGroupStudyEndRes;
import com.inha.server.study.group.dto.response.PostGroupStudyQuitRes;
import com.inha.server.study.group.dto.response.PostGroupStudyRes;
import com.inha.server.study.group.dto.response.WaitingListRes;
import com.inha.server.study.group.model.ApplyStatus;
import com.inha.server.study.group.model.GroupStudy;
import com.inha.server.study.group.repository.ApplyStatusRepository;
import com.inha.server.study.group.repository.GroupStudyRepository;
import com.inha.server.study.self.model.SelfStudyShare;
import com.inha.server.study.self.repository.SelfStudyShareRepository;
import com.inha.server.user.util.TokenProvider;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Objects;
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
public class GroupStudyService {

    private final GroupStudyRepository groupStudyRepository;
    private final SelfStudyShareRepository selfStudyShareRepository;
    private final ApplyStatusRepository applyStatusRepository;

    public ResponseEntity<PostGroupStudyRes> create(String jwt, PostGroupStudyReq request) {
        String userId = getUserId(jwt);
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Date groupDuration = request.getGroupDuration();
        GroupStudy groupStudy = insertGroupStudy(userId, request, groupDuration);

        return new ResponseEntity<>(PostGroupStudyRes.builder()
            .ownerId(userId)
            .groupId(groupStudy.getId())
            .build(), HttpStatus.CREATED);
    }

    @Transactional
    public GroupStudy insertGroupStudy(String userId, PostGroupStudyReq request,
        Date groupDuration) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        formatter.setTimeZone(TimeZone.getTimeZone("UTC"));

        GroupStudy groupStudy;
        if (groupDuration != null) {
            groupStudy = GroupStudy.builder()
                .languageId(request.getLanguageId())
                .ownerId(userId)
                .groupName(request.getGroupName())
                .tags(request.getTags())
                .groupPersonnel(request.getGroupPersonnel())
                .introduction(request.getIntroduction())
                .studyMate(Collections.singletonList(userId))
                .groupDuration(formatter.format(groupDuration))
                .createdAt(formatter.format(new Date()))
                .build();
        } else {
            groupStudy = GroupStudy.builder()
                .languageId(request.getLanguageId())
                .ownerId(userId)
                .groupName(request.getGroupName())
                .tags(request.getTags())
                .groupPersonnel(request.getGroupPersonnel())
                .introduction(request.getIntroduction())
                .studyMate(Collections.singletonList(userId))
                .createdAt(formatter.format(new Date()))
                .build();
        }
        groupStudyRepository.save(groupStudy);
        return groupStudy;
    }

    @Transactional
    public ResponseEntity<GetGroupStudyListRes> getGroupStudyList(Pageable pageable) {
        int totalPage = groupStudyRepository.findAll().size();

        List<GroupStudy> groupStudyList = groupStudyRepository.findAll(
            PageRequest.of(pageable.getPageNumber(), pageable.getPageSize())).getContent();

        List<GroupStudyRes> groupStudyResList = getGroupStudyResList(groupStudyList);

        return new ResponseEntity<>(GetGroupStudyListRes.builder()
            .groupStudyList(groupStudyResList)
            .totalPage((int) Math.ceil(totalPage / 5.0))
            .currentPage(pageable.getPageNumber())
            .build(), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<GetGroupStudyListRes> search(String keyword, Pageable pageable) {
        if (Objects.equals(keyword, "")) {
            return getGroupStudyList(pageable);
        }
        List<GroupStudy> groupStudyList = groupStudyRepository.findByGroupNameContainingIgnoreCase(
            keyword);
        List<GroupStudy> groupStudyListWithPageable = groupStudyRepository.findByGroupNameContainingIgnoreCase(
            keyword, pageable);

        int totalPage = groupStudyList.size();
        Integer currentPage = pageable.getPageNumber();

        List<GroupStudyRes> groupStudyResList = getGroupStudyResList(groupStudyListWithPageable);

        return new ResponseEntity<>(GetGroupStudyListRes.builder()
            .groupStudyList(groupStudyResList)
            .totalPage((int) Math.ceil(totalPage / 5.0))
            .currentPage(currentPage)
            .build(), HttpStatus.OK);
    }

    private List<GroupStudyRes> getGroupStudyResList(List<GroupStudy> groupStudyList) {
        List<GroupStudyRes> groupStudyResList = new ArrayList<>();

        for (GroupStudy groupStudy : groupStudyList) {
            GroupStudyRes groupStudyRes = GroupStudyRes.builder()
                .state(groupStudy.getState())
                .groupId(groupStudy.getId())
                .languageId(groupStudy.getLanguageId())
                .groupName(groupStudy.getGroupName())
                .groupPersonnel(groupStudy.getGroupPersonnel())
                .tags(groupStudy.getTags())
                .introduction(groupStudy.getIntroduction())
                .groupDuration(groupStudy.getGroupDuration())
                .ownerId(groupStudy.getOwnerId())
                .isFinished(groupStudy.getIsFinished())
                .createdAt(groupStudy.getCreatedAt())
                .build();

            groupStudyResList.add(groupStudyRes);
        }
        return groupStudyResList;
    }

    @Transactional
    public ResponseEntity<GetGroupStudyPostDetailRes> getGroupStudyDetail(String groupStudyId) {
        GroupStudy groupStudy = groupStudyRepository.findById(groupStudyId).orElse(null);

        if (groupStudy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(GetGroupStudyPostDetailRes.builder()
            .groupId(groupStudy.getId())
            .languageId(groupStudy.getLanguageId())
            .groupName(groupStudy.getGroupName())
            .groupPersonnel(groupStudy.getGroupPersonnel())
            .tags(groupStudy.getTags())
            .introduction(groupStudy.getIntroduction())
            .groupDuration(groupStudy.getGroupDuration())
            .ownerId(groupStudy.getOwnerId())
            .isFinished(groupStudy.getIsFinished())
            .build(), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<PostGroupStudyEndRes> end(String jwt, String groupStudyId) {
        String userId = getUserId(jwt);
        GroupStudy groupStudy = groupStudyRepository.findById(groupStudyId).orElse(null);

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (groupStudy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (!userId.equals(groupStudy.getOwnerId())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        groupStudy.changeStudyIsFinished();
        groupStudy.changeStudyState();
        groupStudyRepository.save(groupStudy);

        return new ResponseEntity<>(PostGroupStudyEndRes.builder()
            .groupStudyId(groupStudy.getId())
            .isFinished(groupStudy.getIsFinished())
            .build(), HttpStatus.OK);
    }

    private static String getUserId(String jwt) {
        return TokenProvider.getSubject(jwt);
    }

    @Transactional
    public ResponseEntity<WaitingListRes> apply(String jwt, String groupStudyId) {
        String userId = getUserId(jwt);
        GroupStudy groupStudy = groupStudyRepository.findById(groupStudyId).orElse(null);

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (groupStudy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        String ownerId = groupStudy.getOwnerId();
        List<String> waitingList = groupStudy.getWaitingList();

        if (waitingList.contains(userId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (userId.equals(ownerId)) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        waitingList.add(userId);
        groupStudyRepository.save(groupStudy);

        applyStatusRepository.save(
            ApplyStatus.builder()
                .userId(userId)
                .groupId(groupStudyId)
                .build()
        );

        return new ResponseEntity<>(WaitingListRes.builder()
            .groupId(groupStudyId)
            .waitingList(waitingList)
            .build(), HttpStatus.CREATED);
    }

    @Transactional
    public ResponseEntity<WaitingListRes> readWaitingList(String jwt, String groupStudyId) {
        String userId = getUserId(jwt);
        GroupStudy groupStudy = groupStudyRepository.findById(groupStudyId).orElse(null);

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (groupStudy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (!userId.equals(groupStudy.getOwnerId())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(WaitingListRes.builder()
            .groupId(groupStudyId)
            .waitingList(groupStudy.getWaitingList())
            .build(), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<PostGroupStudyAcceptRes> approve(String jwt, String groupStudyId,
        String userId) {
        String ownerId = getUserId(jwt);
        GroupStudy groupStudy = groupStudyRepository.findById(groupStudyId).orElse(null);

        if (ownerId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (groupStudy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<String> waitingList = groupStudy.getWaitingList();
        List<String> studyMate = groupStudy.getStudyMate();

        if (!ownerId.equals(groupStudy.getOwnerId())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        if (Objects.equals(groupStudy.getGroupPersonnel(), (long) studyMate.size())
            || studyMate.contains(userId)) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        if (!waitingList.contains(userId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        waitingList.remove(userId);
        studyMate.add(userId);

        groupStudyRepository.save(groupStudy);

        ApplyStatus applyStatus = applyStatusRepository.findByUserId(userId).orElse(null);
        applyStatus.toggleStatus();

        applyStatusRepository.save(applyStatus);

        return new ResponseEntity<>(PostGroupStudyAcceptRes.builder()
            .groupId(groupStudyId)
            .studyMate(studyMate)
            .build(), HttpStatus.CREATED);
    }

    @Transactional
    public ResponseEntity<PostDelegateRes> delegate(String jwt, String groupStudyId,
        String changedOwnerId) {
        GroupStudy groupStudy = groupStudyRepository.findById(groupStudyId).orElse(null);
        String userId = getUserId(jwt);

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (groupStudy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        String originOwnerId = groupStudy.getOwnerId();
        List<String> studyMate = groupStudy.getStudyMate();

        if (!userId.equals(originOwnerId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        if (!studyMate.contains(changedOwnerId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        groupStudy.changeStudyOwner(changedOwnerId);
        groupStudyRepository.save(groupStudy);

        return new ResponseEntity<>(PostDelegateRes.builder()
            .originOwnerId(originOwnerId)
            .changedOwnerId(changedOwnerId)
            .build(), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<PostGroupStudyQuitRes> quit(String jwt, String groupStudyId) {
        GroupStudy groupStudy = groupStudyRepository.findById(groupStudyId).orElse(null);
        String userId = getUserId(jwt);

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (groupStudy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<String> studyMate = groupStudy.getStudyMate();
        if (userId.equals(groupStudy.getOwnerId())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        if (!studyMate.contains(userId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        studyMate.remove(userId);
        groupStudyRepository.save(groupStudy);

        return new ResponseEntity<>(PostGroupStudyQuitRes.builder()
            .quitUserId(userId)
            .build(), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<GetGroupStudyInfoRes> readInfo(String groupStudyId) {
        GroupStudy groupStudy = groupStudyRepository.findById(groupStudyId).orElse(null);

        if (groupStudy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(GetGroupStudyInfoRes.builder()
            .languageId(groupStudy.getLanguageId())
            .groupName(groupStudy.getGroupName())
            .groupPersonnel(groupStudy.getGroupPersonnel())
            .studyMate(groupStudy.getStudyMate())
            .tags(groupStudy.getTags())
            .introduction(groupStudy.getIntroduction())
            .groupDuration(groupStudy.getGroupDuration())
            .ownerId(groupStudy.getOwnerId())
            .createdAt(groupStudy.getCreatedAt())
            .build(), HttpStatus.OK);
    }

    public ResponseEntity<List<SelfStudyShare>> getSharedSelfStudyList(String groupStudyId) {
        List<SelfStudyShare> selfStudyShareList = selfStudyShareRepository.findAllByGroupIdOrderBySharedAtAsc(groupStudyId).orElse(null);

        return new ResponseEntity<>(selfStudyShareList, HttpStatus.OK);
    }
}
