package team08.issuetracker.interceptor;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import team08.issuetracker.jwt.JwtService;

@Slf4j
@Component
public class LoginCheckInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;

    public LoginCheckInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

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

        // jwt 토큰 없거나 유효하지 않으면 로그인페이지로 리다이렉트
        if (jwtToken == null || !jwtService.parseJwtToken(jwtToken)) {
            response.sendRedirect("/member/login");
            log.error("error : {}", "jwt 토큰 없거나 유효하지 않으면 로그인페이지로 리다이렉트");
            return false;
        }

        return true;

    }
}
