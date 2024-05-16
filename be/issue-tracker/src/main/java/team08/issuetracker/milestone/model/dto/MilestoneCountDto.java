package team08.issuetracker.milestone.model.dto;

public record MilestoneCountDto(
        long totalCount,
        long openedCount,
        long closedCount
) {}
