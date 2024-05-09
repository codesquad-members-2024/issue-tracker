package com.CodeSquad.IssueTracker.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/post/registration")
    public String postRegistration(@RequestBody User user) {
        userService.save(user);

        return "success";
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