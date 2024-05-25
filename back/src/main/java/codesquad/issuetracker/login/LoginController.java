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

import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginForm loginForm, BindingResult bindingResult, HttpSession session) {
        // 유효성 검사 오류 처리
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining(", "));
            return ResponseEntity
                    .badRequest()
                    .body(new LoginResponse(null, errorMessage));
        }

        String loginId = loginForm.getLoginId();
        String password = loginForm.getPassword();
        // 로그인 아이디, 비밀번호 확인
        if (loginService.authenticate(loginId, password)) {
            JwtUtil jwtUtil = new JwtUtil();
            String token = jwtUtil.createToken(loginId); // JWT 토큰 생성
            return ResponseEntity
                    .ok()
                    .body(new LoginResponse(token, "로그인 성공!"));
        }

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new LoginResponse(null, "잘못된 로그인 정보 입니다."));
    }
}
