package team08.issuetracker.milestone.model.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MilestoneResponse {
    private MilestoneCountDto milestoneCounts;
    private List<MilestoneDto> milestones;

    public MilestoneResponse(MilestoneCountDto milestoneCounts, List<MilestoneDto> milestones) {
        this.milestoneCounts = milestoneCounts;
        this.milestones = milestones;
    }

}
