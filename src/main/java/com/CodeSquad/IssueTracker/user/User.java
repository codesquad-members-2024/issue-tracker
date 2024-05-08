package com.CodeSquad.IssueTracker.user;

import lombok.Data;

@Data
public class User {
    private String userId;
    private String userPassword;
    private String userNickname;
}
