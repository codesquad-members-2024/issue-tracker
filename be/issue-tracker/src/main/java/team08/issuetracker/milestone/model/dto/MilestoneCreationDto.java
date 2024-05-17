package team08.issuetracker.milestone.model.dto;

import lombok.Getter;
import team08.issuetracker.milestone.model.Milestone;

import java.time.LocalDate;

public record MilestoneCreationDto(
        String name,
        String description,
        LocalDate completeDate
) {
    public Milestone toEntity() {
        return new Milestone(name, description, completeDate);
    }
}
