package team08.issuetracker.issue.model.dto.update;

import java.util.Set;

public record IssueStateMultipleUpdateResponse(Set<Long> stateUpdatedIssues) {
}
