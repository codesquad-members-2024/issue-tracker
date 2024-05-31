package team08.issuetracker.member.model.dto;


import lombok.Getter;

@Getter
public class MemberLogoutResponse {
    private final String message;

    public MemberLogoutResponse() {
        this.message = "로그아웃 성공!";
    }
}
