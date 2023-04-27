package com.inha.server.mypage.service;


import com.inha.server.mypage.dto.request.ProfileNameAndNicknameReq;
import com.inha.server.mypage.dto.response.ProfileInfoRes;
import com.inha.server.user.model.User;
import com.inha.server.user.repository.UserRepository;
import com.inha.server.user.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final UserRepository userRepository;

    private static String getUserId(String jwt) {
        String userId = TokenProvider.getSubject(jwt);

        if (userId == null) {
            throw new IllegalStateException("존재하지 않는 사용자입니다.");
        }
        return userId;
    }

    @Transactional
    public ResponseEntity<ProfileInfoRes> getProfile(String userId) {

        // 요청한 사용자가 존재하지 않으면 예외 발생
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.valueOf(404));
        }

        // 정보 반환
        ProfileInfoRes profileInfoRes = ProfileInfoRes.builder()
            .userName(user.getName())
            .nickName(user.getNickname())
            .email(user.getEmail())
            .profileIconUrl(user.getProfileImage())
            .build();

        return new ResponseEntity<>(profileInfoRes, HttpStatus.NOT_FOUND);
    }

    @Transactional
    public HttpStatus updateProfileNameAndNickname(String jwt,
        ProfileNameAndNicknameReq profileReq) {
        String userId = getUserId(jwt);

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
        String userId = getUserId(jwt);

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return HttpStatus.NOT_FOUND;
        }

        // User 의 이름과 닉네임 수정
        user.setImgURI(updateURI);

        userRepository.save(user);

        return HttpStatus.OK;
    }
}