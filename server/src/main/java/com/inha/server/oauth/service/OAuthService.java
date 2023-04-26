package com.inha.server.oauth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inha.server.oauth.dto.OAuthUserDto;
import com.inha.server.oauth.model.KakaoTokens;
import com.inha.server.user.util.TokenProvider;
import com.inha.server.user.model.User;
import com.inha.server.user.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class OAuthService {

  private static final String GRANT_TYPE = "authorization_code";

  private final UserRepository userRepository;
  private final RestTemplate restTemplate;
  private final PasswordEncoder passwordEncoder;
  private final TokenProvider tokenProvider;

  @Value("${oauth.kakao.url.auth}")
  private String authUrl;
  @Value("${oauth.kakao.client-id}")
  private String clientId;
  @Value("${oauth.kakao.url.host}")
  private String redirectHost;

  public String kakaoLogin(String authorize_code) throws JsonProcessingException {
    // 인가코드를 통해서 access_token 발급
    String accessToken = getAccessToken(authorize_code);
    // access_token 으로 회원정보 받아오기
    OAuthUserDto oAuthUserDto = getKakaoUserInfo(accessToken);
    // 회원가입
    User user = signUpIfNotRegisteredUser(oAuthUserDto);
    // 로그인 후 jwt 리턴
    return login(user);
  }

  private String getAccessToken(String authorize_code) {
    String url = authUrl + "/oauth/token";
    String reUrl = redirectHost + "/oauth/kakao";

    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

    body.add("grant_type", GRANT_TYPE);
    body.add("client_id", clientId);
    body.add("redirect_uri", reUrl);
    body.add("code", authorize_code);

    HttpEntity<?> request = new HttpEntity<>(body, httpHeaders);

    KakaoTokens response = restTemplate.postForObject(url, request, KakaoTokens.class);

    return response.getAccessToken();
  }

  private OAuthUserDto getKakaoUserInfo(String accessToken) throws JsonProcessingException {
    // HTTP Header 생성
    HttpHeaders headers = new HttpHeaders();
    headers.add("Authorization", "Bearer " + accessToken);
    headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

    // HTTP 요청 보내기
    HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
    RestTemplate rt = new RestTemplate();
    ResponseEntity<String> response = rt.exchange(
        "https://kapi.kakao.com/v2/user/me",
        HttpMethod.POST,
        kakaoUserInfoRequest,
        String.class
    );

    // responseBody 에 있는 정보를 꺼냄
    String responseBody = response.getBody();
    ObjectMapper objectMapper = new ObjectMapper();
    JsonNode jsonNode = objectMapper.readTree(responseBody);

    Long id = jsonNode.get("id").asLong();
    String email = jsonNode.get("kakao_account").get("email").asText();
    String profileImage = jsonNode.get("properties").get("profile_image").asText();
    String name = jsonNode.get("properties").get("nickname").asText();


    return new OAuthUserDto(id, name, email, profileImage);
  }

  @Transactional
  public User signUpIfNotRegisteredUser(OAuthUserDto oAuthUserDto) {
    // DB 에 중복된 email이 있는지 확인
    Long kakaoId = oAuthUserDto.getId();
    String email = oAuthUserDto.getEmail();
    String name = oAuthUserDto.getName();
    String profile = oAuthUserDto.getProfileImage();

    User user = userRepository.findByEmail(email).orElse(null);

    if (user == null) {
      String nickname = "";
      String password = passwordEncoder.encode(UUID.randomUUID().toString());
      user = User.builder()
          .nickname(nickname)
          .name(name)
          .email(email)
          .kakaoId(kakaoId)
          .profileImage(profile)
          .build();
      userRepository.save(user);
    }
    return user;
  }

  private String login(User user) {
    return tokenProvider.createToken(user);
  }
}
