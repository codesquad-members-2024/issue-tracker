package codesquad.issuetracker.milestone;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;

@Getter
public class Milestone {

    @Id
    private Long id;
    private String title;
    private String description;
    private LocalDateTime dueDate;
    private boolean isOpen;
    private boolean isDeleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    @Builder
    @PersistenceCreator
    public Milestone(Long id, String title, String description, LocalDateTime dueDate,
        boolean isOpen,
        boolean isDeleted, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isOpen = isOpen;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
