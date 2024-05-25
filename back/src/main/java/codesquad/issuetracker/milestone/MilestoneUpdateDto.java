package codesquad.issuetracker.milestone;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@NoArgsConstructor
public class MilestoneUpdateDto {
    private String name;
    private String description;
    private String dueDate;

    public Milestone toEntity(Long id) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return Milestone.builder()
                .id(id)
                .name(name)
                .description(description)
                .dueDate(LocalDateTime.parse(dueDate, formatter))
                .build();
    }
}
