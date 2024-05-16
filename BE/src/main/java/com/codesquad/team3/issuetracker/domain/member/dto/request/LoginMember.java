package com.codesquad.team3.issuetracker.domain.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginMember {
    private final String memberId;
    private final String password;
}