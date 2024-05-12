package com.codesquad.team3.issuetracker.domain.member.entity;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class Member {

    private final String id;
    private final String password;
    private final String nickName;
    private final LocalDateTime birthday;
    private final LocalDateTime joinDate;
    private final String email;
    private final boolean isDeleted;

}
