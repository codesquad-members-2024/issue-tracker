package com.CodeSquad.IssueTracker.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor

public class User {
    private String userId;
    private String userPassword;
    private String userNickname;
}
