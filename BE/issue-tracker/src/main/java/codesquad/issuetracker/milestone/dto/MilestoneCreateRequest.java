package codesquad.issuetracker.milestone.dto;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.milestone.Milestone;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MilestoneCreateRequest {

    private final String title;
    private final String description;
    private final LocalDateTime dueDate;

    public Milestone toEntity() {
        return Milestone.builder()
            .title(this.title)
            .description(this.description)
            .dueDate(this.dueDate)
            .updatedAt(LocalDateTime.now())
            .state(State.OPEN)
            .build();
    }

}
