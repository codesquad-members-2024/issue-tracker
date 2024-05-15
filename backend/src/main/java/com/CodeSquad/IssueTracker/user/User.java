package com.CodeSquad.IssueTracker.user;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Table;

@Setter
@Getter

@Table("users")
public class User implements Persistable<String> {
    @Id
    private String userId;

    private String userPassword;

    private String userNickname;

    @Transient
    private boolean isNew = true;

    @Override
    public String getId() {
        return userId;
    }

    @Override
    public boolean isNew() {
        return isNew;
    }

    public User(String userId, String userPassword, String userNickname) {
        this.userId = userId;
        this.userPassword = userPassword;
        this.userNickname = userNickname;
    }
}
