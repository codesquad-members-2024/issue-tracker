package codesquad.issuetracker.milestone;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@AllArgsConstructor
public class MilestoneSaveDto {
    private String name;
    private String description;
    private String dueDate;

    public Milestone toEntity() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return Milestone.builder()
                .name(name)
                .description(description)
                .dueDate(LocalDateTime.parse(dueDate, formatter))
                .build();
    }
}
