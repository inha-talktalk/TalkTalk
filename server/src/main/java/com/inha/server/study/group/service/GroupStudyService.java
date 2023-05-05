package com.inha.server.study.group.service;

import com.inha.server.study.group.dto.request.PostGroupStudyReq;
import com.inha.server.study.group.dto.response.DeleteGroupStudyRes;
import com.inha.server.study.group.dto.response.GetGroupStudyDetailRes;
import com.inha.server.study.group.dto.response.GetGroupStudyListRes;
import com.inha.server.study.group.dto.response.GroupStudyRes;
import com.inha.server.study.group.dto.response.PostDelegateRes;
import com.inha.server.study.group.dto.response.PostGroupStudyAcceptRes;
import com.inha.server.study.group.dto.response.PostGroupStudyRes;
import com.inha.server.study.group.dto.response.WaitingListRes;
import com.inha.server.study.group.model.ApplyStatus;
import com.inha.server.study.group.model.GroupStudy;
import com.inha.server.study.group.repository.ApplyStatusRepository;
import com.inha.server.study.group.repository.GroupStudyRepository;
import com.inha.server.user.util.TokenProvider;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GroupStudyService {

  private final GroupStudyRepository groupStudyRepository;
  private final ApplyStatusRepository applyStatusRepository;

  private static String getUserId(String jwt) {
    String userId = TokenProvider.getSubject(jwt);

    validate(userId == null, "존재하지 않는 사용자입니다.");
    return userId;
  }

  private static void validate(boolean groupStudy, String group_study_not_found) {
    if (groupStudy) {
      throw new IllegalStateException(group_study_not_found);
    }
  }

  public PostGroupStudyRes create(String jwt, PostGroupStudyReq request) {
    String userId = getUserId(jwt);
    GroupStudy groupStudy = insertGroupStudy(userId, request);

    return PostGroupStudyRes.builder()
        .ownerId(userId)
        .groupId(groupStudy.getId())
        .build();
  }

  @Transactional
  public GroupStudy insertGroupStudy(String userId, PostGroupStudyReq request) {
    GroupStudy groupStudy = GroupStudy.builder()
        .languageId(request.getLanguageId())
        .ownerId(userId)
        .groupName(request.getGroupName())
        .tags(request.getTags())
        .groupPersonnel(request.getGroupPersonnel())
        .introduction(request.getIntroduction())
        .studyMate(Collections.singletonList(userId))
        .build();

    groupStudyRepository.save(groupStudy);
    return groupStudy;
  }

  @Transactional
  public GetGroupStudyListRes getGroupStudyList(Pageable pageable) {
    List<GroupStudy> groupStudyList = groupStudyRepository.findAll(
        PageRequest.of(pageable.getPageNumber(), pageable.getPageSize())).getContent();
    List<GroupStudyRes> groupStudyResList = getGroupStudyResList(groupStudyList);

    return GetGroupStudyListRes.builder()
        .size(groupStudyResList.size())
        .groupStudyList(groupStudyResList)
        .build();
  }

  private List<GroupStudyRes> getGroupStudyResList(List<GroupStudy> groupStudyList) {
    List<GroupStudyRes> groupStudyResList = new ArrayList<>();

    for (GroupStudy groupStudy : groupStudyList) {
      GroupStudyRes groupStudyRes = GroupStudyRes.builder()
          .groupId(groupStudy.getId())
          .languageId(groupStudy.getLanguageId())
          .groupName(groupStudy.getGroupName())
          .groupPersonnel(groupStudy.getGroupPersonnel())
          .tags(groupStudy.getTags())
          .introduction(groupStudy.getIntroduction())
          .groupDuration(groupStudy.getGroupDuration())
          .ownerId(groupStudy.getOwnerId())
          .isFinished(groupStudy.getIsFinished())
          .build();

      groupStudyResList.add(groupStudyRes);
    }
    return groupStudyResList;
  }

  @Transactional
  public GetGroupStudyDetailRes getGroupStudyDetail(String groupStudyId) {
    GroupStudy groupStudy = getGroupStudy(groupStudyId);
    validate(groupStudy == null, "group study not found");

    return GetGroupStudyDetailRes.builder()
        .groupId(groupStudy.getId())
        .languageId(groupStudy.getLanguageId())
        .groupName(groupStudy.getGroupName())
        .groupPersonnel(groupStudy.getGroupPersonnel())
        .tags(groupStudy.getTags())
        .introduction(groupStudy.getIntroduction())
        .groupDuration(groupStudy.getGroupDuration())
        .ownerId(groupStudy.getOwnerId())
        .isFinished(groupStudy.getIsFinished())
        .build();
  }

  private GroupStudy getGroupStudy(String groupStudyId) {
    return groupStudyRepository.findById(groupStudyId).orElse(null);
  }

  @Transactional
  public DeleteGroupStudyRes delete(String jwt, String groupStudyId) {
    String userId = getUserId(jwt);
    GroupStudy groupStudy = getGroupStudy(groupStudyId);

    validate(groupStudy == null, "group study not found");
    validate(!userId.equals(groupStudy.getOwnerId()), "user do not have delete permission");
    groupStudyRepository.delete(groupStudy);

    return DeleteGroupStudyRes.builder()
        .groupStudyId(groupStudy.getId())
        .ownerId(userId)
        .build();
  }

  @Transactional
  public WaitingListRes apply(String jwt, String groupStudyId) {
    String userId = getUserId(jwt);
    GroupStudy groupStudy = getGroupStudy(groupStudyId);
    String ownerId = groupStudy.getOwnerId();
    List<String> waitingList = groupStudy.getWaitingList();

    validate(userId.equals(ownerId), "owner can not apply for study.");
    validate(waitingList.contains(userId), "Already applied.");

    waitingList.add(userId);
    groupStudyRepository.save(groupStudy);

    applyStatusRepository.save(
        ApplyStatus.builder()
            .userId(userId)
            .groupId(groupStudyId)
            .build()
    );

    return WaitingListRes.builder()
        .groupId(groupStudyId)
        .waitingList(waitingList)
        .build();
  }

  @Transactional
  public WaitingListRes readWaitingList(String jwt, String groupStudyId) {
    String userId = getUserId(jwt);
    GroupStudy groupStudy = getGroupStudy(groupStudyId);

    validate(!userId.equals(groupStudy.getOwnerId()),
        "General user can not read waiting list.");

    return WaitingListRes.builder()
        .groupId(groupStudyId)
        .waitingList(groupStudy.getWaitingList())
        .build();
  }

  @Transactional
  public PostGroupStudyAcceptRes approve(String jwt, String groupStudyId, String userId) {
    String ownerId = getUserId(jwt);

    GroupStudy groupStudy = getGroupStudy(groupStudyId);
    List<String> waitingList = groupStudy.getWaitingList();
    List<String> studyMate = groupStudy.getStudyMate();

    validate(!ownerId.equals(groupStudy.getOwnerId()), "Only study owners can approve.");
    validate(!waitingList.contains(userId), "user did not apply.");
    validate(studyMate.contains(userId), "Already approved.");

    waitingList.remove(userId);
    studyMate.add(userId);

    groupStudyRepository.save(groupStudy);

    ApplyStatus applyStatus = applyStatusRepository.findByUserId(userId).get();
    applyStatus.toggleStatus();

    applyStatusRepository.save(applyStatus);

    return PostGroupStudyAcceptRes.builder()
        .groupId(groupStudyId)
        .studyMate(studyMate)
        .build();
  }

  @Transactional
  public PostDelegateRes delegate(String jwt, String groupStudyId, String changedOwnerId) {
    GroupStudy groupStudy = groupStudyRepository.findById(groupStudyId).orElse(null);
    String originOwnerId = groupStudy.getOwnerId();
    String userId = getUserId(jwt);
    List<String> studyMate = groupStudy.getStudyMate();

    validate(!userId.equals(originOwnerId), "Only study owners can delegate.");
    validate(!studyMate.contains(changedOwnerId), "The user is not a study member.");

    groupStudy.changeStudyOwner(changedOwnerId);
    groupStudyRepository.save(groupStudy);

    return PostDelegateRes.builder()
        .originOwnerId(originOwnerId)
        .changedOwnerId(changedOwnerId)
        .build();
  }
}
