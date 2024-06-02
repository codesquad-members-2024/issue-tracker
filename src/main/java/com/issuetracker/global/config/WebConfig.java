package com.issuetracker.global.config;

import com.issuetracker.domain.member.MemberRepository;
import com.issuetracker.domain.milestone.argumentresolver.MilestoneIdArgumentResolver;
import java.util.List;

import com.issuetracker.global.security.AuthTokenInterceptor;
import com.issuetracker.global.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    @Value("${cors.originUrl}")
    private String originUrl;

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(originUrl)
                .allowCredentials(true)
                .allowedHeaders("*")
                .allowedMethods("*");
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new MilestoneIdArgumentResolver());
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AuthTokenInterceptor(jwtTokenProvider, memberRepository))
                .addPathPatterns("/**")
                .excludePathPatterns("/api/v1/auth/**", "/swagger-ui/**", "/swagger-resources/**", "/v2/api-docs/**", "/v3/api-docs/**");
    }
}