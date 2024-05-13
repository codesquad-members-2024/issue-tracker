package com.CodeSquad.IssueTracker.user;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "users")

public class User {
    @Id
    private String userId;
    private String userPassword;
    private String userNickname;

}
