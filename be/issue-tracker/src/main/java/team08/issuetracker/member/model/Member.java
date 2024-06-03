package team08.issuetracker.member.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@NoArgsConstructor
public class Member {
    @Id
    private String memberId;
    private String password;
    private String profileImage;

    public Member(String memberId, String password, String profileImage) {
        this.memberId = memberId;
        this.password = password;
        this.profileImage = profileImage;    // default
    }
}
