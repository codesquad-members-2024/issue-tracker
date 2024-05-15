package codesquad.issuetracker.login;

import codesquad.issuetracker.user.User;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestParam LoginForm loginForm, HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        String email = loginForm.getEmail();
        String password = loginForm.getPassword();

        //이메일 유효성 검사
        if (!isValidEmail(email)) {
            response.put("message", "유효하지 않은 이메일");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (loginService.authenticate(email, password, session)) {
            session.setAttribute("loginId", email); // 세션에 이메일 저장
            response.put("message", "로그인 성공");
            response.put("loginId", email);
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "잘못된 로그인 정보 입니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpSession session) {
        session.invalidate();
        Map<String, String> response = new HashMap<>();
        response.put("message", "로그아웃 성공");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/issues")
    public ResponseEntity<Map<String, Object>> issuesMain(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        User loggedInUser = (User) session.getAttribute("LOGGED_IN_USER");
        if (loggedInUser == null) {
            response.put("message", "사용자가 로그인 되지 않았습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        response.put("message", "메인 페이지");
        response.put("user", loggedInUser);
        return ResponseEntity.ok(response);
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }
}
