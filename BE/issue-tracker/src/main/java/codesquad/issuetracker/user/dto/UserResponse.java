package codesquad.issuetracker.user.dto;

import codesquad.issuetracker.user.User;
import java.time.LocalDateTime;
import lombok.Value;

@Value
public class UserResponse {

    String id;
    String username;
    LocalDateTime createdAt;


    public static UserResponse of(User user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getCreatedAt());
    }
}
