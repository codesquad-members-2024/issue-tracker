package team08.issuetracker.milestone.model.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MilestoneOverviewResponse {
    private MilestoneCountResponse milestoneCounts;
    private List<MilestoneDetailResponse> milestones;

    public MilestoneOverviewResponse(MilestoneCountResponse milestoneCounts, List<MilestoneDetailResponse> milestones) {
        this.milestoneCounts = milestoneCounts;
        this.milestones = milestones;
    }

}
