package com.CodeSquad.IssueTracker.interceptor;

import com.CodeSquad.IssueTracker.Exception.user.UserNotLoginException;
import com.CodeSquad.IssueTracker.user.jwtlogin.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.servlet.HandlerInterceptor;

public class CheckLoginInterceptor implements HandlerInterceptor {

    private final JwtUtil jwtUtil;

    public CheckLoginInterceptor(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            return true; // OPTIONS 요청은 바로 통과시킴
        }

//        HttpSession session = request.getSession();
//        if (session.getAttribute("userId") == null) {
//            throw new UserNotLoginException("로그인이 필요합니다.");
//        }

        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            throw new UserNotLoginException("토큰이 없거나 잘못되었습니다.");
        }

        try {
            String userId = jwtUtil.validateToken(token.substring(7));
        } catch (Exception e) {
            throw new UserNotLoginException("토큰이 유효하지 않습니다.");
        }

        return true;
    }
}
