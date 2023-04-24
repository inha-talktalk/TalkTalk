package com.inha.server.mypage.service;


import com.inha.server.mypage.dto.ProfileInfoRes;
import com.inha.server.user.model.User;
import com.inha.server.user.repository.UserRepository;
import com.inha.server.user.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final UserRepository userRepository;

    private static void userCheck(String jwt) {
        if (TokenProvider.getSubject(jwt) == null) {
            throw new IllegalStateException("존재하지 않는 사용자입니다.");
        }
    }

    public ProfileInfoRes getProfile(String jwt, String userId) {
        // 요청한 사용자가 존재하는지 확인
        userCheck(jwt);

        // 요청한 사용자가 존재하지 않으면 예외 발생
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalStateException("존재하지 않는 사용자입니다."));

        // 정보 반환
        ProfileInfoRes profileInfoRes = ProfileInfoRes.builder()
            .userName(user.getName())
            .nickName(user.getNickname())
            .email(user.getEmail())
            .profileIconUrl(user.getProfileImage())
            .build();

        return profileInfoRes;
    }
}