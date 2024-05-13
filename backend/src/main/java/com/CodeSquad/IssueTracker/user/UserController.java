package com.CodeSquad.IssueTracker.user;

import com.CodeSquad.IssueTracker.user.dto.LoginRequest;
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
    public ResponseEntity<?> registerNewUser(@RequestBody User user){
        if (userService.isUserNotExists(user)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (userService.save(user)){
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest,
                                       HttpServletRequest request){
        if (userService.isLoginRequestNotExists(loginRequest)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String userId = loginRequest.getUserId();
        String userPassword = loginRequest.getUserPassword();

        if (userService.authenticate(userId, userPassword)){
            HttpSession session = request.getSession(true);
            session.setMaxInactiveInterval(32400); //9시간
            session.setAttribute("userId", userId);

            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/validation/{id}")
    public ResponseEntity<?> getValidationId(@PathVariable("id") String id) {
        if (userService.isUserIdDuplicated(id)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
