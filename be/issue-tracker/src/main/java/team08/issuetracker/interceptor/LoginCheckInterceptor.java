package team08.issuetracker.interceptor;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import team08.issuetracker.exception.interceptor.UnauthorizedAccessException;
import team08.issuetracker.jwt.JwtService;

@Slf4j
@Component
public class LoginCheckInterceptor implements HandlerInterceptor {
  
    private final JwtService jwtService;

    public LoginCheckInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

        // 쿠키에서 JWT 토큰 가져오기
        String jwtToken = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwt-token".equals(cookie.getName())) {
                    jwtToken = cookie.getValue();
                    break;
                }
            }
        }

        if (jwtToken == null || !jwtService.parseJwtToken(jwtToken)) {
            throw new UnauthorizedAccessException();
        }

        return true;
    }
}
