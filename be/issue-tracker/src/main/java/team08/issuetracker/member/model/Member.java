package team08.issuetracker.member.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
public class Member {
    private final String memberId;
    private final String password;

    public Member(String memberId, String password) {
        this.memberId = memberId;
        this.password = password;
    }
}