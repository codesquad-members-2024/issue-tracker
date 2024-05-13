package team08.issuetracker.member.model;

import lombok.Getter;

@Getter
public class MemberResponse {
    private String memberId;
    private String token;

    public MemberResponse(String memberId, String token) {
        this.memberId = memberId;
        this.token = token;
    }
}
