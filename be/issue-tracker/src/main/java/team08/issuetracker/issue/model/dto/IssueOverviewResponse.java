package team08.issuetracker.issue.model.dto;

import java.util.List;

public record IssueOverviewResponse(IssueCountResponse issueCounts,
                                    List<IssueDetailResponse> issues) {
}
