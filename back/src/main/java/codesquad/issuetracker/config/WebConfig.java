package codesquad.issuetracker.config;

import codesquad.issuetracker.login.JwtUtil;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 와일드카드
                .allowedOrigins(
                        "http://3.38.30.88:8080",
                        "http://localhost:3000",
                        "http://localhost:5173",
                        "http://192.168.1.25:5173",
                        "http://fe-issue-tracker-s3.s3-website.ap-northeast-2.amazonaws.com"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor(new JwtUtil()))
                .addPathPatterns("/**")
                .excludePathPatterns("/login");
    }
}
