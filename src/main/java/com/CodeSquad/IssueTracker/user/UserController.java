package com.CodeSquad.IssueTracker.user;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/post/registration")
    public ResponseEntity<?> registerNewUser(@RequestBody User user){
        if (userService.isUserNotExists(user)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        userService.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/post/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest,
                                       HttpServletRequest request){
        if (userService.isLoginRequestNotExists(loginRequest)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String userId = loginRequest.getUserId();
        String userPassword = loginRequest.getUserPassword();

        if (userService.authenticate(userId, userPassword)){
            HttpSession session = request.getSession(true);
            session.setMaxInactiveInterval(1800);
            session.setAttribute("userId", userId);

            return new ResponseEntity<>(session.getId(),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}

    @GetMapping("/get/validation/{id}")
    public ResponseEntity<?> getValidationId(@PathVariable("id") String id) {
        boolean isDuplicated = userService.isUserIdDuplicated(id);

        if (isDuplicated) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
