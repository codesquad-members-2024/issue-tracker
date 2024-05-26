package codesquad.issuetracker.user.dto;

import lombok.Getter;

@Getter
public class LoginResponse {

    private final String token;
    private final String id;

    public LoginResponse(String token, String id) {
        this.token = token;
        this.id = id;
    }
}
