package team08.issuetracker.milestone.model.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MilestoneOverviewDto {
    private MilestoneCountDto milestoneCounts;
    private List<MilestoneDetailDto> milestones;

    public MilestoneOverviewDto(MilestoneCountDto milestoneCounts, List<MilestoneDetailDto> milestones) {
        this.milestoneCounts = milestoneCounts;
        this.milestones = milestones;
    }

}
