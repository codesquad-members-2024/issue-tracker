package codesquad.issuetracker.user;

import lombok.Getter;

@Getter
public class UserShowDto {

    private String loginId;
    private String profileImage;

    public UserShowDto(User user) {
        this.loginId = user.getLoginId();
        this.profileImage = user.getProfileImage();
    }
}
