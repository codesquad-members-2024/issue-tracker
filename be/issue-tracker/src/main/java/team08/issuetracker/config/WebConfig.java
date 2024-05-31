package team08.issuetracker.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import team08.issuetracker.interceptor.LoginCheckInterceptor;

import java.util.Arrays;
import java.util.List;

@Configuration
@Profile({"!local"})
public class WebConfig implements WebMvcConfigurer {

    private static final List<String> ALLOWED_ORIGINS = Arrays.asList(
            "https://issue-tracker-team08.site",    // 배포 Domain 주소
            "http://192.168.1.34:3000",             // 개발용 Domain 주소
            "http://192.168.35.157:3000"            // 개발용 Domain 주소
    );

    @Autowired
    LoginCheckInterceptor loginCheckInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginCheckInterceptor)
                .addPathPatterns("/**") // 모든 경로에 인터셉터 적용하기
                .excludePathPatterns("/member/login", "/member/logout"); // 로그인, 로그아웃 은 인터셉터 제외
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(ALLOWED_ORIGINS.toArray(new String[0]))
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Authorization", "Set-Cookie")
                .allowCredentials(true); // 자격 증명 허용
    }
}
