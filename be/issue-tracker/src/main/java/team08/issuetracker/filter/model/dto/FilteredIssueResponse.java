package team08.issuetracker.filter.model.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import team08.issuetracker.issue.model.Issue;
import team08.issuetracker.issue.model.dto.IssueDetailResponse;

import java.util.List;

public record FilteredIssueResponse(List<IssueDetailResponse> issues) {

}
