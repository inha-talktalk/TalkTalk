package com.inha.server.study.group.service;

import com.inha.server.study.group.dto.request.PostGroupStudyReq;
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

    if (userId == null) {
      throw new IllegalStateException("존재하지 않는 사용자입니다.");
    }
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
}
