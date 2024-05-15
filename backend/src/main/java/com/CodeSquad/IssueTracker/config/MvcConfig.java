package com.CodeSquad.IssueTracker.config;

import com.CodeSquad.IssueTracker.interceptor.CheckLoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new CheckLoginInterceptor())
                .order(1)
                .addPathPatterns("/issue/**", "/issues")
                .excludePathPatterns("/login", "/registration");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://d1h2zmtghg8ybi.cloudfront.net",
                        "http://115.90.185.254"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}