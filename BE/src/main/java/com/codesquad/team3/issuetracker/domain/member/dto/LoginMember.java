package com.codesquad.team3.issuetracker.domain.member.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class LoginMember {
    private final String id;
    private final String password;
}
