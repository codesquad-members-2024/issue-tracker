package team08.issuetracker.member.model.dto;

import team08.issuetracker.member.model.Member;

public record MemberCreationRequest(String memberId, String password) {
    private static final String imageUrl = "https://issue-tracker-storage.s3.ap-northeast-2.amazonaws.com/profiles/kirby.webp";

    public Member toEntity() {
        return new Member(memberId, password, imageUrl);
    }
}
