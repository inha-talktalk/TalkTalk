package com.inha.server.study.group.service;

import com.inha.server.study.group.dto.request.PostGroupStudyReq;
import com.inha.server.study.group.dto.response.DeleteGroupStudyRes;
import com.inha.server.study.group.dto.response.GetGroupStudyDetailRes;
import com.inha.server.study.group.dto.response.GetGroupStudyListRes;
import com.inha.server.study.group.dto.response.GroupStudyRes;
import com.inha.server.study.group.dto.response.PostGroupStudyRes;
import com.inha.server.study.group.model.GroupStudy;
import com.inha.server.study.group.repository.GroupStudyRepository;
import com.inha.server.user.util.TokenProvider;
import java.util.ArrayList;
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

  private static String getUserId(String jwt) {
    String userId = TokenProvider.getSubject(jwt);

    validate(userId == null, "존재하지 않는 사용자입니다.");
    return userId;
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

  private static void validate(boolean groupStudy, String group_study_not_found) {
    if (groupStudy) {
      throw new IllegalStateException(group_study_not_found);
    }
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
}
