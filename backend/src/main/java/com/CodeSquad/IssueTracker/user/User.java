package com.CodeSquad.IssueTracker.user;

import lombok.Data;

@Data
public class User {
    private String userId;
    private String userPassword;
    private String userNickname;

    public User(){
    }

    public User(String userId, String userPassword, String userNickname) {
        this.userId = userId;
        this.userPassword = userPassword;
        this.userNickname = userNickname;
    }
}
