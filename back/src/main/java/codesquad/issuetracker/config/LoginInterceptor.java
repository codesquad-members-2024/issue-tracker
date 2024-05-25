package codesquad.issuetracker.config;

import codesquad.issuetracker.login.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

@RequiredArgsConstructor
@Slf4j
public class LoginInterceptor implements HandlerInterceptor {

    private final JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String authorization = request.getHeader("Authorization");
        String accessToken = jwtUtil.getJwtTokenFromHeader(authorization);

        try {
            String token = jwtUtil.validateToken(accessToken); // JWT 토큰 검증
            request.setAttribute("loginId", token); // loginId 값 저장
            return true;
        } catch (Exception e) {
            log.info("인증되지 않은 토큰");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 유효하지 않은 JWT 토큰이면 401에러 반환
            return false;
        }
    }
}
