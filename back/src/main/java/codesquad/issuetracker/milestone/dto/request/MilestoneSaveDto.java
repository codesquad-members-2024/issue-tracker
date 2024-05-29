package codesquad.issuetracker.milestone.dto.request;

import codesquad.issuetracker.milestone.Milestone;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@AllArgsConstructor
public class MilestoneSaveDto {

    private String name;
    private String description;
    private String dueDate;

    public Milestone toEntity() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(Milestone.DATE_TIME_FORMAT);
        Milestone.MilestoneBuilder milestoneBuilder = Milestone.builder()
                .name(name)
                .description(description);

        if (dueDate != null) {
            milestoneBuilder
                    .dueDate(LocalDate.parse(dueDate, formatter));
        }
        return milestoneBuilder.build();
    }
}
