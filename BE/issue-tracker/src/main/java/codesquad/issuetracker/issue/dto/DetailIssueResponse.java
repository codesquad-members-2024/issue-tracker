package codesquad.issuetracker.issue.dto;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.comment.CommentResponse;
import codesquad.issuetracker.issue.Issue;
import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.milestone.dto.SimpleMilestoneResponse;
import codesquad.issuetracker.user.dto.UserResponse;
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
    String content;
    LocalDateTime openAt;
    LocalDateTime updatedAt;
    LocalDateTime closedAt;
    SimpleMilestoneResponse milestone;
    State state;
    boolean isDeleted;
    Set<Label> labels;
    Set<UserResponse> assignees;
    List<CommentResponse> comments;

    public static DetailIssueResponse of(Issue issue, Set<Label> labels, Set<UserResponse> assignees, List<CommentResponse> comments, SimpleMilestoneResponse milestoneResponse) {
        return DetailIssueResponse.builder()
            .id(issue.getId())
            .authorId(issue.getAuthorId())
            .title(issue.getTitle())
            .content(issue.getContent())
            .openAt(issue.getOpenAt())
            .updatedAt(issue.getUpdatedAt())
            .closedAt(issue.getClosedAt())
            .milestone(milestoneResponse)
            .state(issue.getState())
            .isDeleted(issue.isDeleted())
            .labels(labels)
            .assignees(assignees)
            .comments(comments)
            .build();
    }

}
