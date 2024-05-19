package codesquad.issuetracker.issue.dto;

import codesquad.issuetracker.issue.Assignee;
import codesquad.issuetracker.issue.Issue;
import codesquad.issuetracker.issue.IssueAttachedLabel;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Value;

@Value
public class IssueCreateRequest {

    String userId;
    String title;
    String description;
    Set<String> assigneeIds;
    List<Long> labelIds;
    Long milestoneId;

    public Issue toEntity() {
        Set<IssueAttachedLabel> labelRefs = labelIds.stream()
            .map(IssueAttachedLabel::new)
            .collect(Collectors.toSet());

        Set<Assignee> assigneeIds = this.assigneeIds.stream()
            .map(Assignee::new)
            .collect(Collectors.toSet());

        return Issue.from(userId, title, description, milestoneId, labelRefs, assigneeIds);
    }

}
