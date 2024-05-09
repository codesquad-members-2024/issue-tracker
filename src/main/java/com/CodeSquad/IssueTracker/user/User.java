package com.CodeSquad.IssueTracker.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class User {
    private String userId;
    private String userPassword;
    private String userNickname;
}
