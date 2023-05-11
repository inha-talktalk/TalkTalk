package com.inha.server.study.group.controller;

import com.inha.server.study.group.dto.request.PostGroupStudyReq;
import com.inha.server.study.group.dto.response.GetGroupStudyInfoRes;
import com.inha.server.study.group.dto.response.GetGroupStudyListRes;
import com.inha.server.study.group.dto.response.GetGroupStudyPostDetailRes;
import com.inha.server.study.group.dto.response.PostDelegateRes;
import com.inha.server.study.group.dto.response.PostGroupStudyAcceptRes;
import com.inha.server.study.group.dto.response.PostGroupStudyEndRes;
import com.inha.server.study.group.dto.response.PostGroupStudyQuitRes;
import com.inha.server.study.group.dto.response.PostGroupStudyRes;
import com.inha.server.study.group.dto.response.WaitingListRes;
import com.inha.server.study.group.service.GroupStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
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
  public PostGroupStudyRes create(@RequestHeader(value = "x-access-token") String jwt,
      @RequestBody PostGroupStudyReq request) {
    return groupStudyService.create(jwt, request);
  }

  @GetMapping("/list")
  public GetGroupStudyListRes read(@RequestHeader(value = "x-access-token") String jwt,
      @PageableDefault(size = 5, sort = "createdAt", direction = Direction.ASC) Pageable pageable) {
    return groupStudyService.getGroupStudyList(pageable);
  }

  @GetMapping("/search")
  public GetGroupStudyListRes search(@RequestHeader(value = "x-access-token") String jwt,
      @RequestParam String keyword,
      @PageableDefault(size = 5, sort = "createdAt", direction = Direction.ASC) Pageable pageable) {
    return groupStudyService.search(keyword, pageable);
  }

  @GetMapping("")
  public GetGroupStudyPostDetailRes read(@RequestHeader(value = "x-access-token") String jwt,
      @RequestParam(value = "groupStudyId") String groupStudyId) {
    return groupStudyService.getGroupStudyDetail(groupStudyId);
  }

  @PostMapping("/end")
  public PostGroupStudyEndRes end(@RequestHeader(value = "x-access-token") String jwt,
      @RequestParam(value = "groupStudyId") String groupStudyId) {
    return groupStudyService.end(jwt, groupStudyId);
  }

  @PostMapping("/apply")
  public WaitingListRes apply(@RequestHeader(value = "x-access-token") String jwt,
      @RequestParam(value = "groupStudyId") String groupStudyId) {
    return groupStudyService.apply(jwt, groupStudyId);
  }

  @GetMapping("/waiting-list")
  public WaitingListRes readWaitingList(@RequestHeader(value = "x-access-token") String jwt,
      @RequestParam(value = "groupStudyId") String groupStudyId) {
    return groupStudyService.readWaitingList(jwt, groupStudyId);
  }

  @PostMapping("/approve")
  public PostGroupStudyAcceptRes approve(@RequestHeader(value = "x-access-token") String jwt,
      @RequestParam(value = "groupStudyId") String groupStudyId,
      @RequestParam(value = "userId") String userId) {
    return groupStudyService.approve(jwt, groupStudyId, userId);
  }

  @PostMapping("/delegate")
  public PostDelegateRes delegate(@RequestHeader(value = "x-access-token") String jwt,
      @RequestParam(value = "groupStudyId") String groupStudyId,
      @RequestParam(value = "to") String changedOwnerId) {
    return groupStudyService.delegate(jwt, groupStudyId, changedOwnerId);
  }

  @PostMapping("/quit")
  public PostGroupStudyQuitRes quit(@RequestHeader(value = "x-access-token") String jwt,
      @RequestParam(value = "groupStudyId") String groupStudyId) {
    return groupStudyService.quit(jwt, groupStudyId);
  }

  @GetMapping("/info")
  public GetGroupStudyInfoRes readInfo(@RequestHeader(value = "x-access-token") String jwt,
      @RequestParam(value = "groupStudyId") String groupStudyId) {
    return groupStudyService.readInfo(groupStudyId);
  }
}
