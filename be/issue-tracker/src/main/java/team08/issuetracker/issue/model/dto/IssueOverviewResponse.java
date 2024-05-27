package team08.issuetracker.issue.model.dto;

import java.util.List;

public record IssueOverviewResponse(IssueCountResponse issueCountResponse,
                                    List<IssueDetailResponse> issueDetailResponses) {
}
