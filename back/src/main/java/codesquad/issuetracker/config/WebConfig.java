package codesquad.issuetracker.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 와일드카드
                .allowedOrigins("*") // 모두 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
