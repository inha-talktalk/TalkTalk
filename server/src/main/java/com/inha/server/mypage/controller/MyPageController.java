package com.inha.server.mypage.controller;

import com.inha.server.mypage.dto.request.ProfileNameAndNicknameReq;
import com.inha.server.mypage.dto.response.AchievementRes;
import com.inha.server.mypage.dto.response.MyStudiesRes;
import com.inha.server.mypage.dto.response.ProfileInfoRes;
import com.inha.server.mypage.service.MyPageService;
import com.inha.server.s3.service.S3Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "마이페이지", description = "마이페이지 API Document")
public class MyPageController {

    private final S3Service s3Service;
    private final MyPageService myPageService;

    /*
     * 회원 정보를 가지고 옴
     * @PathVariable userId 조회하고자 하는 사용자의 id
     * */
    @Operation(
        summary = "다른 유저 정보 조회",
        description = "원하는 유저의 정보를 조회하는 메서드",
        responses = {
            @ApiResponse(responseCode = "401", ref = "unAuthorizedAPI"),
            @ApiResponse(responseCode = "404", ref = "notFoundAPI"),
            @ApiResponse(
                responseCode = "200",
                content = @Content(
                    mediaType = "application/json",
                    examples = {
                        @ExampleObject(
                            value = "{\"userName\" : \"홍길동\", \"nickName\" : \"놀부\", \"email\" : \"test@mail.com\", \"profileIconUrl\" : \"dfjadsfjldfjsal.img\"}"
                        )
                    }
                )
            )
        }
    )
    @GetMapping("profile/{userId}")
    @Parameter(name = "userId", example = "sdfjkasjfeifj3r3ej")
    public ResponseEntity<ProfileInfoRes> getOthersProfileInfo(@PathVariable String userId) {
        return myPageService.getOthersProfile(userId);
    }

    /*
     * 회원 정보를 가지고 옴
     * @param jwt 사용자 정보 인증
     * @PathVariable userId 조회하고자 하는 사용자의 id
     * */
    @GetMapping("/profile/self")
    public ResponseEntity<ProfileInfoRes> getSelfProfileInfo(
        @RequestHeader(value = "x-access-token") String jwt) {
        return myPageService.getSelfProfile(jwt);
    }

    /*
     * 이름과 닉네임을 수정
     * @param jwt 사용자 정보 인증
     * @RequestBody profileReq 변경하려는 정보
     * */
    @PatchMapping("/profile")
    public HttpStatus updateProfileNameAndNickname(
        @RequestHeader(value = "x-access-token") String jwt,
        @RequestBody ProfileNameAndNicknameReq profileReq) {

        return myPageService.updateProfileNameAndNickname(jwt, profileReq);
    }

    /*
     * 프로필 이미지를 수정
     * @param jwt 사용자 정보 인증
     * @RequestParam uploadImg 변경하려는 이미지 MultipartFile
     * */
    @PostMapping("/profile/img")
    public HttpStatus updateProfileImg(
        @RequestHeader(value = "x-access-token") String jwt,
        @RequestPart("imgFile") MultipartFile uploadImg) throws IOException {

        String updateImageURI = s3Service.upload(uploadImg, "profileImg", jwt);

        return myPageService.updateProfileImg(jwt, updateImageURI);
    }

    /*
     * 수락이 된 스터디 중에서 완료 or 진행 상태인 스터디 목록을 불러옴
     * @param jwt 사용자 정보 인증
     * @PathVariable status : done (종료된 스터디) & progress (진행 중인 스터디)
     * */
    @GetMapping("/study/{status}")
    public ResponseEntity<List<MyStudiesRes>> getStudies(
        @RequestHeader(value = "x-access-token") String jwt,
        @PathVariable String status) {
        return myPageService.getStudies(jwt, status);
    }

    /*
     * 신청 후 수락 대기인 상태의 스터디 리스트를 불러옴
     * @param jwt 사용자 정보 인증
     * */
    @GetMapping("/study/apply")
    public ResponseEntity<List<MyStudiesRes>> getApplyStudies(
        @RequestHeader(value = "x-access-token") String jwt) {
        return myPageService.getApplyStudies(jwt);
    }

    @GetMapping("/achieve")
    public ResponseEntity<AchievementRes> getAchievement() {

        AchievementRes achievementRes = AchievementRes.builder()
            .teamMateCount(6)
            .studyLanguageCount(2)
            .joinTime(LocalDate.from(LocalDateTime.now()))
            .completedSelfStudyCount(10)
            .build();
        return new ResponseEntity<>(achievementRes, HttpStatus.OK);
    }
}