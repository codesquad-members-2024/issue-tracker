package com.CodeSquad.IssueTracker.user;

import com.CodeSquad.IssueTracker.Exception.user.InvalidCredentialException;
import com.CodeSquad.IssueTracker.Exception.user.UserAlreadyExistsException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*") //나중에 변경
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registerNewUser(@RequestBody User user) {
        if (userService.isUserNotExists(user)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (userService.save(user)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest,
                                       HttpServletRequest request) {
        if (userService.isLoginRequestNotExists(loginRequest)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String userId = loginRequest.getUserId();
        String userPassword = loginRequest.getUserPassword();

        if (userService.authenticate(userId, userPassword)) {
            HttpSession session = request.getSession(true);
            session.setMaxInactiveInterval(32400); //9시간
            session.setAttribute("userId", userId);

            return new ResponseEntity<>(HttpStatus.OK);
        }
        throw new InvalidCredentialException("잘못된 로그인 정보입니다.");
    }

    @GetMapping("/validation/{id}")
    public ResponseEntity<?> getValidationId(@PathVariable("id") String id) {
        if (userService.isUserIdDuplicated(id)) {
            throw new UserAlreadyExistsException("이미 존재하는 ID입니다.");
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
