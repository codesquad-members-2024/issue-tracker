package team08.issuetracker.filter.model.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import team08.issuetracker.issue.model.Issue;

import java.util.List;

@RequiredArgsConstructor
@Getter
public class FilteredIssueResponse {
    private final List<Issue> issueList;
}
