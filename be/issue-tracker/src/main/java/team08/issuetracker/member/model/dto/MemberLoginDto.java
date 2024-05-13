package team08.issuetracker.member.model.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter @Setter
public class MemberLoginDto {
    private String memberId;
    private String password;
}
