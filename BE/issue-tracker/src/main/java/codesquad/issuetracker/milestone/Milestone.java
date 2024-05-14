package codesquad.issuetracker.milestone;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;

@Getter
public class Milestone {

    public enum State {
        OPEN,
        CLOSED
    }

    @Id
    private Long id;
    private String title;
    private String description;
    private LocalDateTime dueDate;
    private State state;
    private boolean isDeleted;
    private LocalDateTime updatedAt;


    @Builder
    @PersistenceCreator
    public Milestone(Long id, String title, String description, LocalDateTime dueDate,
        State state,
        boolean isDeleted, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.state = state;
        this.isDeleted = isDeleted;
        this.updatedAt = updatedAt;
    }
}
