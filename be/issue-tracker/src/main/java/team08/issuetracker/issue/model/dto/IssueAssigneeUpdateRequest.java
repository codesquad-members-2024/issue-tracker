package team08.issuetracker.issue.model.dto;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import team08.issuetracker.issue.ref.Assignee;

public record IssueAssigneeUpdateRequest(List<String> assigneeIds) {

    public Set<Assignee> getAssigneesOfIssue(long issueId) {
        return this.assigneeIds.stream()
                .map(eachAssigneeId -> new Assignee(issueId, eachAssigneeId))
                .collect(Collectors.toSet());
    }
}
