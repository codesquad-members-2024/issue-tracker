package team08.issuetracker.member.model.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MemberOverviewResponse {
    private final List<MemberPreviewResponse> members;

    public MemberOverviewResponse(List<MemberPreviewResponse> members) {
        this.members = members;
    }

    public static MemberOverviewResponse from(List<MemberPreviewResponse> members) {
        return new MemberOverviewResponse(members);
    }
}
