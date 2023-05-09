package com.inha.server.mypage.service;


import com.inha.server.mypage.dto.request.ProfileNameAndNicknameReq;
import com.inha.server.mypage.dto.response.MyStudiesRes;
import com.inha.server.mypage.dto.response.ProfileInfoRes;
import com.inha.server.study.group.model.ApplyStatus;
import com.inha.server.study.group.model.GroupStudy;
import com.inha.server.study.group.repository.ApplyStatusRepository;
import com.inha.server.study.group.repository.GroupStudyRepository;
import com.inha.server.user.model.User;
import com.inha.server.user.repository.UserRepository;
import com.inha.server.user.util.TokenProvider;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final UserRepository userRepository;
    private final GroupStudyRepository groupStudyRepository;
    private final ApplyStatusRepository applyStatusRepository;

    private static String getUserId(String jwt) {
        String userId = TokenProvider.getSubject(jwt);

        if (userId == null) {
            throw new IllegalStateException();
        }
        return userId;
    }

    @Transactional
    public ResponseEntity<ProfileInfoRes> getSelfProfile(String jwt) {
        String userId;

        try {
            userId = getUserId(jwt);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return getOthersProfile(userId);
    }

    @Transactional
    public ResponseEntity<ProfileInfoRes> getOthersProfile(String userId) {

        // 요청한 사용자가 존재하지 않으면 예외 발생
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // 정보 반환
        ProfileInfoRes profileInfoRes = ProfileInfoRes.builder()
            .userName(user.getName())
            .nickName(user.getNickname())
            .email(user.getEmail())
            .profileIconUrl(user.getProfileImage())
            .build();

        return new ResponseEntity<>(profileInfoRes, HttpStatus.OK);
    }

    @Transactional
    public HttpStatus updateProfileNameAndNickname(String jwt,
        ProfileNameAndNicknameReq profileReq) {
        String userId;

        try {
            userId = getUserId(jwt);
        } catch (Exception e) {
            return HttpStatus.UNAUTHORIZED;
        }

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return HttpStatus.NOT_FOUND;
        }

        // User 의 이름과 닉네임 수정
        user.setNameAndNickname(profileReq.getUserName(), profileReq.getNickName());

        userRepository.save(user);

        return HttpStatus.OK;
    }

    @Transactional

    public HttpStatus updateProfileImg(String jwt, String updateURI) {
        String userId;

        try {
            userId = getUserId(jwt);
        } catch (Exception e) {
            return HttpStatus.UNAUTHORIZED;
        }

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return HttpStatus.NOT_FOUND;
        }

        // User 의 이름과 닉네임 수정
        user.setImgURI(updateURI);

        userRepository.save(user);

        return HttpStatus.OK;
    }

    @Transactional
    public ResponseEntity<List<MyStudiesRes>> getApplyStudies(String jwt) {
        String userId;

        try {
            userId = getUserId(jwt);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<ApplyStatus> applyStatusList = applyStatusRepository.findAllByUserIdAndAccepted(userId,
            false);
        List<MyStudiesRes> myStudiesResList = new ArrayList<>();

        for (ApplyStatus apply : applyStatusList) {
            GroupStudy groupStudy = groupStudyRepository.findById(apply.getGroupId()).orElse(null);
            if (groupStudy == null) {
                continue;
            }
            myStudiesResList.add(
                MyStudiesRes.builder()
                    .groupId(apply.getGroupId())
                    .groupName(groupStudy.getGroupName())
                    .tags(groupStudy.getTags())
                    .build()
            );
        }

        return new ResponseEntity<>(myStudiesResList, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<List<MyStudiesRes>> getStudies(String jwt, String status) {
        String userId;
        boolean pass = true;
        if (status.equals("progress")) {
            pass = false;
        }

        try {
            userId = getUserId(jwt);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<ApplyStatus> applyStatusList = applyStatusRepository.findAllByUserIdAndAccepted(userId,
            true);
        List<GroupStudy> groupStudyList = groupStudyRepository.findByOwnerId(userId);
        List<MyStudiesRes> myStudiesResList = new ArrayList<>();

        for (ApplyStatus apply : applyStatusList) {
            GroupStudy groupStudy = groupStudyRepository.findById(apply.getGroupId()).orElse(null);

            if (groupStudy == null || pass != groupStudy.getIsFinished()) {
                continue;
            }

            myStudiesResList.add(
                MyStudiesRes.builder()
                    .groupId(apply.getGroupId())
                    .groupName(groupStudy.getGroupName())
                    .tags(groupStudy.getTags())
                    .build()
            );
        }

        for (GroupStudy group : groupStudyList) {
            if (pass != group.getIsFinished()) {
                continue;
            }

            myStudiesResList.add(
                MyStudiesRes.builder()
                    .groupId(group.getId())
                    .groupName(group.getGroupName())
                    .tags(group.getTags())
                    .build()
            );
        }

        return new ResponseEntity<>(myStudiesResList, HttpStatus.OK);
    }
}