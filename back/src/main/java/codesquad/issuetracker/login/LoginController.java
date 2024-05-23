package codesquad.issuetracker.login;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    private final int SESSION_EXPIRATION_TIME = 60 * 60;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginForm loginForm, BindingResult bindingResult, HttpSession session) {
        Map<String, String> responseMap = new HashMap<>();

        // 유효성 검사 오류 처리
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining(", "));
            responseMap.put("message", errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap);
        }

        String loginId = loginForm.getLoginId();
        String password = loginForm.getPassword();

        if (loginService.authenticate(loginId, password, session)) {
            session.setAttribute("loginId", loginId); // 세션에 이메일 저장
            session.setMaxInactiveInterval(SESSION_EXPIRATION_TIME); // 세션 유효 시간 1시간
            responseMap.put("message", "로그인 성공");
            return ResponseEntity.ok(responseMap);
        }
        responseMap.put("message", "잘못된 로그인 정보 입니다.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpSession session) {
        Map<String, String> responseMap = new HashMap<>();

        // 세션이 존재하는지 확인
        if (session == null || session.getAttribute("loginId") == null) {
            responseMap.put("message", "세션이 존재하지 않습니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap);
        }

        // 세션 만료
        session.invalidate();
        responseMap.put("message", "로그아웃 성공");
        return ResponseEntity.ok(responseMap);
    }
}
