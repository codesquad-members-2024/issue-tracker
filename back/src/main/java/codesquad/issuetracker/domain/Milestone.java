package codesquad.issuetracker.domain;

import lombok.Getter;
import org.springframework.data.annotation.Id;

@Getter
public class Milestone {

    @Id
    private String name;
    private String dueDate;
    private boolean isValid;

    public Milestone(String name,
                     String dueDate,
                     boolean isValid) {
        this.name = name;
        this.dueDate = dueDate;
        this.isValid = isValid;
    }
}
