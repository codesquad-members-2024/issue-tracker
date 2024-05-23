package codesquad.issuetracker.milestone.dto;

import codesquad.issuetracker.milestone.Milestone;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class SimpleMilestoneResponse {

    Long id;
    String title;
    LocalDateTime dueDate;
    String state;

    public static SimpleMilestoneResponse of(Milestone milestone) {
        return SimpleMilestoneResponse.builder()
            .id(milestone.getId())
            .title(milestone.getTitle())
            .dueDate(milestone.getDueDate())
            .state(milestone.getState().name())
            .build();
    }


}
