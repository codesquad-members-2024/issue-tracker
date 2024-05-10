package codesquad.issuetracker.domain;

import lombok.Getter;
import org.springframework.data.annotation.Id;

@Getter
public class User {

    @Id
    private String userId;
    private String password;

    public User(String userId,
                String password) {
        this.userId = userId;
        this.password = password;
    }
}
