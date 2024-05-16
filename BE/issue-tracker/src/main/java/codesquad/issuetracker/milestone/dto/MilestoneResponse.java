package codesquad.issuetracker.milestone.dto;

import codesquad.issuetracker.issue.Issue;
import codesquad.issuetracker.milestone.Milestone;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
@Setter(AccessLevel.NONE)
@Builder
public class MilestoneResponse {

    private final Long id;
    private final String title;
    private final String description;
    private final String dueDate;
    private final String state;
    private final String updatedAt;
    private final List<Issue> issues;

    public static MilestoneResponse of(Milestone milestone, List<Issue> issues) {
        return MilestoneResponse.builder()
            .id(milestone.getId())
            .title(milestone.getTitle())
            .description(milestone.getDescription())
            .dueDate(milestone.getDueDate().toString())
            .state(milestone.getState().name())
            .updatedAt(milestone.getUpdatedAt().toString())
            .issues(issues)
            .build();
    }


}
