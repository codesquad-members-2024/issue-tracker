package team08.issuetracker.milestone.model.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class MilestoneDetailDto {
    private long id;
    private String name;
    private LocalDate completeDate;
    private String description;
    private long openedIssueCount;
    private long closedIssueCount;
    private double milestoneProgress;

    public MilestoneDetailDto(Long id, String name, LocalDate completeDate, String description) {
        this.id = id;
        this.name = name;
        this.completeDate = completeDate;
        this.description = description;
    }
}
