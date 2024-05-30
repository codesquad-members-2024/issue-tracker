package team08.issuetracker.issue.model.dto;

import lombok.Getter;

@Getter
public class IssueCountDto {
    private final long openedIssueCount;
    private final long closedIssueCount;
    private double milestoneProgress;

    public IssueCountDto(long openedIssueCount, long closedIssueCount) {
        this.openedIssueCount = openedIssueCount;
        this.closedIssueCount = closedIssueCount;
        setMilestoneProgress();
    }

    private void setMilestoneProgress() {
        long totalIssueCount = openedIssueCount + closedIssueCount;
        this.milestoneProgress = Math.round(((double) closedIssueCount / totalIssueCount) * 100 / 5) * 5;
    }

}
