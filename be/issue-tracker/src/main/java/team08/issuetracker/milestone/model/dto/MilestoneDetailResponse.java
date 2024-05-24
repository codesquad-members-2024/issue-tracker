package team08.issuetracker.milestone.model.dto;

import lombok.Getter;
import team08.issuetracker.milestone.model.Milestone;

import java.time.LocalDate;

@Getter
public class MilestoneDetailResponse {
    private long id;
    private String name;
    private LocalDate completeDate;
    private String description;
    private boolean state;
    private long openedIssueCount;
    private long closedIssueCount;
    private double milestoneProgress;

    public MilestoneDetailResponse(Long id, String name, LocalDate completeDate, String description, boolean state) {
        this.id = id;
        this.name = name;
        this.completeDate = completeDate;
        this.description = description;
        this.state = state;
        this.openedIssueCount = 10;
        this.closedIssueCount = 10;
        this.milestoneProgress = 50.0;
    }

    public static MilestoneDetailResponse from(Milestone milestone) {
        return new MilestoneDetailResponse(
                milestone.getId(),
                milestone.getName(),
                milestone.getCompleteDate(),
                milestone.getDescription(),
                milestone.isOpen()
        );
    }

}
