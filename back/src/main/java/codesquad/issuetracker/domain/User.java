package codesquad.issuetracker.domain;

import lombok.Getter;
import org.springframework.data.annotation.Id;

@Getter
public class User {

    @Id
    private String loginId;
    private String password;

    public User(String loginId,
                String password) {
        this.loginId = loginId;
        this.password = password;
    }
}
