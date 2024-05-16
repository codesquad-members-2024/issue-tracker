package codesquad.issuetracker.issue.dto;

import codesquad.issuetracker.comment.Comment;
import codesquad.issuetracker.issue.Assignee;
import codesquad.issuetracker.issue.Issue;
import codesquad.issuetracker.issue.IssueAttachedLabel;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import lombok.Builder;
import lombok.Value;
import org.springframework.data.annotation.Id;

@Value
@Builder
public class DetailIssueResponse {

    @Id
    Long id;
    String authorId;
    String title;
    String description;
    LocalDateTime openAt;
    LocalDateTime updatedAt;
    LocalDateTime closedAt;
    Long milestoneId;
    boolean isOpen;
    boolean isDeleted;
    Set<IssueAttachedLabel> labels;
    Set<Assignee> assignees;
    List<Comment> comments;

    public static DetailIssueResponse of(Issue issue) {
        return DetailIssueResponse.builder()
            .id(issue.getId())
            .authorId(issue.getAuthorId())
            .title(issue.getTitle())
            .description(issue.getDescription())
            .openAt(issue.getOpenAt())
            .updatedAt(issue.getUpdatedAt())
            .closedAt(issue.getClosedAt())
            .milestoneId(issue.getMilestoneId())
            .isOpen(issue.isOpen())
            .isDeleted(issue.isDeleted())
            .labels(issue.getLabelRefs())
            .assignees(issue.getAssigneeIds())
            .comments(issue.getComments())
            .build();
    }

}
