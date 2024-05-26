package codesquad.issuetracker.milestone.dto;

import codesquad.issuetracker.count.dto.IssueCount;
import codesquad.issuetracker.milestone.Milestone;
import java.time.LocalDateTime;
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
    int openIssueCount;
    int closedIssueCount;


    public static MilestoneResponse of(Milestone milestone, IssueCount issueCount) {
        return MilestoneResponse.builder()
            .id(milestone.getId())
            .title(milestone.getTitle())
            .description(milestone.getDescription())
            .dueDate(milestone.getDueDate())
            .state(milestone.getState().name())
            .updatedAt(milestone.getUpdatedAt())
            .openIssueCount(issueCount.getOpenIssueCount())
            .closedIssueCount(issueCount.getClosedIssueCount())
            .build();
    }


}
