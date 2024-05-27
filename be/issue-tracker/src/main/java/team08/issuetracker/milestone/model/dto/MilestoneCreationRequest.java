package team08.issuetracker.milestone.model.dto;

import team08.issuetracker.milestone.model.Milestone;

import java.time.LocalDate;

public record MilestoneCreationRequest(
        String name,
        String description,
        LocalDate completeDate
) {
    public Milestone toEntity() {
        return new Milestone(name, description, completeDate);
    }
}
