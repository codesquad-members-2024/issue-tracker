package com.codesquad.team3.issuetracker.domain.member.dto.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseMember {
    private String memberId;
    private String nickname;
    private LocalDateTime birthday;
    private LocalDateTime joinTime;
    private String email;
}
