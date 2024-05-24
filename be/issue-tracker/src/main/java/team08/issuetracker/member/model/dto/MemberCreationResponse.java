package team08.issuetracker.member.model.dto;

import lombok.Getter;
import team08.issuetracker.member.model.Member;

@Getter
public class MemberCreationResponse {
    private final String memberId;
    private final String message;

    public MemberCreationResponse(Member member) {
        this.memberId = member.getMemberId();
        this.message = String.format("회원가입 성공! Id : %s", memberId);
    }

    public static MemberCreationResponse from(Member member) {
        return new MemberCreationResponse(member);
    }
}
