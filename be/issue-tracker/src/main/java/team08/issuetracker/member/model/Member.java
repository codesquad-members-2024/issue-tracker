package team08.issuetracker.member.model;

import lombok.Getter;
import org.springframework.data.annotation.Id;

@Getter
public class Member {
    @Id
    private final String memberId;
    private final String password;
    private final String profileImage;

    public Member(String memberId, String password) {
        this.memberId = memberId;
        this.password = password;
        this.profileImage = "https://issue-tracker-storage.s3.ap-northeast-2.amazonaws.com/profiles/kirby.webp";    // default
    }
}
