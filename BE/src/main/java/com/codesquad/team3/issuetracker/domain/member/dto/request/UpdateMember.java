package com.codesquad.team3.issuetracker.domain.member.dto.request;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdateMember {
    private final String password;
    private final String nickname;
    private final LocalDateTime birthday;
    private final String email;
}
