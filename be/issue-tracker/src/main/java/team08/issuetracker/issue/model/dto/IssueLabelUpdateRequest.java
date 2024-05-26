package team08.issuetracker.issue.model.dto;

import java.util.Set;
import java.util.stream.Collectors;
import team08.issuetracker.issue.ref.IssueAttachedLabel;

public record IssueLabelUpdateRequest(Set<Long> labelIds) {

    public Set<IssueAttachedLabel> getIssueAttachedLabel(long issueId) {
        return this.labelIds.stream()
                .map(eachLabelId -> new IssueAttachedLabel(issueId, eachLabelId))
                .collect(Collectors.toSet());
    }
}
