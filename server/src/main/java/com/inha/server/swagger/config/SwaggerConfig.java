package com.inha.server.swagger.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.examples.Example;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.responses.ApiResponse;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;

/**
 * Swagger springdoc-ui 구성 파일
 */
@Configuration
@OpenAPIDefinition
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi myPageApi(){
        String [] paths = {"/user/**"};
        return GroupedOpenApi.builder()
            .group("MyPage")
            .pathsToMatch(paths)
            .build();
    }
    @Bean
    public GroupedOpenApi studyApi(){
        String [] paths = {"/group-study/**"};
        return GroupedOpenApi.builder()
            .group("GroupStudy")
            .pathsToMatch(paths)
            .build();
    }

    @Bean
    public GroupedOpenApi oauthApi(){
        String [] paths = {"/oauth/**"};
        return GroupedOpenApi.builder()
            .group("OAuth")
            .pathsToMatch(paths)
            .build();
    }

    @Bean
    public OpenAPI openAPI() {
        ApiResponse unAuthorizedAPI = new ApiResponse().content(
            new Content().addMediaType(MediaType.APPLICATION_JSON_VALUE,
                new io.swagger.v3.oas.models.media.MediaType().addExamples("default",
                    new Example().value("{\"code\" : \"401\"}")
                ))
        ).description("인증되지 않는 사용자가 요청했을 경우");

        ApiResponse notFoundAPI = new ApiResponse().content(
            new Content().addMediaType(MediaType.APPLICATION_JSON_VALUE,
                new io.swagger.v3.oas.models.media.MediaType().addExamples("default",
                    new Example().value("{\"code\" : \"404\"}")
                ))
        ).description("요청한 정보가 없는 경우");

        Components components = new Components();
        components.addResponses("unAuthorizedAPI", unAuthorizedAPI);
        components.addResponses("notFoundAPI", notFoundAPI);

        Info info = new Info()
            .title("TalkTalk API Document")
            .version("v0.0.1")
            .description("TalkTalk 프로젝트의 API 명세서입니다.");

        return new OpenAPI()
            .components(components)
            .info(info);
    }
}