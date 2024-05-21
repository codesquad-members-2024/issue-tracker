package team08.issuetracker.issue.model.dto;

import java.util.List;
import team08.issuetracker.issue.model.Issue;

public record IssueListResponse(List<Issue> issues) {
}
