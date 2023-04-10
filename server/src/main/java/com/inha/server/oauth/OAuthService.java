package com.inha.server.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class OAuthService {
    private static final String GRANT_TYPE = "authorization_code";

    @Value("${oauth.kakao.url.auth}")
    private String authUrl;

    @Value("${oauth.kakao.client-id}")
    private String clientId;

    @Value("${oauth.kakao.url.host}")
    private String redirectHost;

    private final RestTemplate restTemplate;

    public String kakoLogin(String authorize_code) {
        // 인가코드를 통해서 access_token 발급
        String access_token = getAccessToken(authorize_code);

        return access_token;
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

        KakaoTokens response = restTemplate.postForObject(url,request, KakaoTokens.class);

        return response.getAccessToken();
    }
}
