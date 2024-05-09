package com.CodeSquad.IssueTracker.user;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/post/registration")
    public ResponseEntity<?> registerNewUser(@RequestBody User user){
        if (user == null){
            log.warn("유저를 받아오지 못하였습니다.");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        log.info("새 유저가 회원가입하였습니다.: {}", user);
        userService.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/post/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest,
                                       HttpServletRequest request){
        if (loginRequest == null){
            log.warn("로그인 실패: 로그인 데이터가 없습니다.");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String userId = loginRequest.getUserId();
        String userPassword = loginRequest.getUserPassword();

        log.info("로그인 시도: {}", userId);

        if (userService.authenticate(userId, userPassword)){
            HttpSession session = request.getSession(true);
            session.setMaxInactiveInterval(1800);
            session.setAttribute("userId", userId);

            log.info("로그인 성공: {}", userId);
            return new ResponseEntity<>(session.getId(),HttpStatus.OK);
        }
        log.warn("로그인 실패: {}", userId);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
