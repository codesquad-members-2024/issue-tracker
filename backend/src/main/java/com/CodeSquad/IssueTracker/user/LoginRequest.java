package com.CodeSquad.IssueTracker.user;

import lombok.Data;

@Data
public class LoginRequest {
    private String userId;
    private String userPassword;
}
