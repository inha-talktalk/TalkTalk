package com.inha.server.mypage.service;


import com.inha.server.mypage.dto.request.ProfileNameAndNicknameReq;
import com.inha.server.mypage.dto.response.AchievementRes;
import com.inha.server.mypage.dto.response.MyStudiesRes;
import com.inha.server.mypage.dto.response.ProfileInfoRes;
import com.inha.server.study.group.model.ApplyStatus;
import com.inha.server.study.group.model.GroupStudy;
import com.inha.server.study.group.repository.ApplyStatusRepository;
import com.inha.server.study.group.repository.GroupStudyRepository;
import com.inha.server.study.self.service.SelfStudyService;
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

    private final SelfStudyService selfStudyService;
    private final UserRepository userRepository;
    private final GroupStudyRepository groupStudyRepository;
    private final ApplyStatusRepository applyStatusRepository;

    private static String getUserId(String jwt) {
        String userId;
        try {
            userId = TokenProvider.getSubject(jwt);
        } catch (Exception e) {
            return null;
        }
        return userId;
    }

    @Transactional
    public ResponseEntity<ProfileInfoRes> getSelfProfile(String jwt) {
        String userId = getUserId(jwt);

        if (userId == null) {
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
    public ResponseEntity<?> updateProfileNameAndNickname(String jwt,
        ProfileNameAndNicknameReq profileReq) {
        String userId = getUserId(jwt);

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // User 의 이름과 닉네임 수정
        user.setNameAndNickname(profileReq.getUserName(), profileReq.getNickName());

        userRepository.save(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional

    public ResponseEntity<?> updateProfileImg(String jwt, String updateURI) {
        String userId = getUserId(jwt);

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // User 의 이름과 닉네임 수정
        user.setImgURI(updateURI);

        userRepository.save(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<List<MyStudiesRes>> getApplyStudies(String jwt) {
        String userId = getUserId(jwt);

        if (userId == null) {
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
        String userId = getUserId(jwt);

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        boolean pass = !status.equals("progress");

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

    public ResponseEntity<AchievementRes> getAchievement(String jwt) {
        String userId = getUserId(jwt);

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findById(userId).get();

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(
            AchievementRes.builder()
                .teamMateCount(getStudies(jwt, "progress").getBody().size())
                .studyLanguageCount(user.getLanguageList().size())
                .joinTime(user.getJoinTime())
                .completedSelfStudyCount(selfStudyService.getSelfStudyCount(userId))
                .build()
            , HttpStatus.OK
        );
    }
}