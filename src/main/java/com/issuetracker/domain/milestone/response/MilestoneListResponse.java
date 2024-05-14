package com.issuetracker.domain.milestone.response;

import com.issuetracker.domain.milestone.Milestone;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class MilestoneListResponse {

    private List<MilestoneResponse> milestones;

    public static MilestoneListResponse of(List<Milestone> milestones) {
        return new MilestoneListResponse(milestones.stream()
                .map(MilestoneResponse::of).toList());
    }
}
