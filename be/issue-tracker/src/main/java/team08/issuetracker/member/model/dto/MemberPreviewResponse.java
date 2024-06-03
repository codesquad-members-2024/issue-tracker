package team08.issuetracker.member.model.dto;

import lombok.Getter;
import team08.issuetracker.member.model.Member;

@Getter
public class MemberPreviewResponse {
    private final String memberId;
    private final String profileImage;

    public MemberPreviewResponse(String memberId, String profileImage) {
        this.memberId = memberId;
        this.profileImage = profileImage;
    }

    public static MemberPreviewResponse from(Member member) {
        return new MemberPreviewResponse(
                member.getMemberId(),
                member.getProfileImage()
        );
    }

}
