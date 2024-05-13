package team08.issuetracker.member.model;

import lombok.Getter;
import org.springframework.data.annotation.Id;

@Getter
public class Member {
    @Id
    private final String memberId;
    private final String password;

    public Member(String memberId, String password) {
        this.memberId = memberId;
        this.password = password;
    }
}