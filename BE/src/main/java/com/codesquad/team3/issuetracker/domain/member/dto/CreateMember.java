package com.codesquad.team3.issuetracker.domain.member.dto;

import java.sql.Timestamp;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CreateMember {
    private final String id;
    private final String password;
    private final String name;
    private final Timestamp birthday;
    private final String email;
}
