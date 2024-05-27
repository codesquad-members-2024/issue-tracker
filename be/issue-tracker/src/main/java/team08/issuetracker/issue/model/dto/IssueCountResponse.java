package team08.issuetracker.issue.model.dto;

public record IssueCountResponse(
        long totalCount,
        long openedCount,
        long closedCount
) {}
