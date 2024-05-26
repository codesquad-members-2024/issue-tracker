package team08.issuetracker.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "https://issue-tracker-team08.site",    // 배포 Domain 주소
                        "http://192.168.1.18:3000",             // 개발용 Domain 주소 [코쿼]
                        "http://192.168.0.15:3000",             // 개발용 Domain 주소 [카페]
                        "http://192.168.35.157:3000")           // 개발용 Domain 주소 [집]
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Authorization", "Set-Cookie")
                .allowCredentials(true); // 자격 증명 허용
    }
}
