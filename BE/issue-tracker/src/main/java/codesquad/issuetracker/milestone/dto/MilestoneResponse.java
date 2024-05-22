package codesquad.issuetracker.milestone.dto;

import codesquad.issuetracker.issue.Issue;
import codesquad.issuetracker.milestone.Milestone;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class MilestoneResponse {

    Long id;
    String title;
    String description;
    LocalDateTime dueDate;
    String state;
    LocalDateTime updatedAt;
    List<Issue> issues;

    public static MilestoneResponse of(Milestone milestone, List<Issue> issues) {
        return MilestoneResponse.builder()
            .id(milestone.getId())
            .title(milestone.getTitle())
            .description(milestone.getDescription())
            .dueDate(milestone.getDueDate())
            .state(milestone.getState().name())
            .updatedAt(milestone.getUpdatedAt())
            .issues(issues)
            .build();
    }


}
