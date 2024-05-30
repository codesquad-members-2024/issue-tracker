package com.CodeSquad.IssueTracker.user;

import com.CodeSquad.IssueTracker.user.dto.LoginRequest;
import com.CodeSquad.IssueTracker.user.dto.UserRegisterRequest;
import com.CodeSquad.IssueTracker.user.jwtlogin.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registerNewUser(@Valid @RequestBody UserRegisterRequest userRegisterRequest) {
        userService.save(userRegisterRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        String token = userService.authenticate(loginRequest);
        return ResponseEntity.ok(token);
    }

    @GetMapping("/registration/validate/{id}")
    public ResponseEntity<?> getValidationId(@PathVariable("id") String id) {
        if (userService.isUserIdDuplicated(id)) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
