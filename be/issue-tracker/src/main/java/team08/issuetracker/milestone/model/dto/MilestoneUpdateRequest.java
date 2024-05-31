package team08.issuetracker.milestone.model.dto;

import java.time.LocalDate;

public record MilestoneUpdateRequest(
        String name,
        String description,
        LocalDate completeDate
) {}
