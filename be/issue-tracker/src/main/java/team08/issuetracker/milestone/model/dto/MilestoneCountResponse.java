package team08.issuetracker.milestone.model.dto;

public record MilestoneCountResponse(
        long totalCount,
        long openedCount,
        long closedCount
) {}
