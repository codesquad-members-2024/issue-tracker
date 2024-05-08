package com.CodeSquad.IssueTracker.user;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/post/registration")
    public String postRegistration(@RequestBody User user){
        userService.save(user);
        return "success";
    }




}
