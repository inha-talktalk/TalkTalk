package com.inha.server.study.group.controller;

import com.inha.server.study.group.dto.request.PostGroupStudyReq;
import com.inha.server.study.group.dto.response.DeleteGroupStudyRes;
import com.inha.server.study.group.dto.response.GetGroupStudyDetailRes;
import com.inha.server.study.group.dto.response.GetGroupStudyListRes;
import com.inha.server.study.group.dto.response.PostGroupStudyRes;
import com.inha.server.study.group.service.GroupStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
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

  @GetMapping("")
  public GetGroupStudyDetailRes read(@RequestHeader(value = "x-access-token") String jwt,
      @RequestParam(value = "groupStudyId") String groupStudyId) {
    return groupStudyService.getGroupStudyDetail(groupStudyId);
  }

  @DeleteMapping("")
  public DeleteGroupStudyRes delete(@RequestHeader(value = "x-access-token") String jwt,
      @RequestParam(value = "groupStudyId") String groupStudyId) {
    return groupStudyService.delete(jwt, groupStudyId);
  }
}
