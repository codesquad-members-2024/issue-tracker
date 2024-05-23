package codesquad.issuetracker.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("Login Check Interceptor {}", request.getRequestURI());
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("loginId") == null) {
            log.info("미인증 사용자 요청");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        response.setStatus(HttpServletResponse.SC_OK);
        return true;
    }
}
