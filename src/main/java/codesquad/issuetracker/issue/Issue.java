package codesquad.issuetracker.issue;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;

@Getter
@ToString
public class Issue implements Persistable<Long> {

    @Id
    private Long id;
    private String authorId;
    private String title;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime closedAt;
    private Long milestoneId;
    private boolean isOpen;
    private boolean isDeleted;
    @Transient
    private boolean isNew;

    @Override
    public boolean isNew() {
        return isNew;
    }

    @Builder
    @PersistenceCreator
    public Issue(Long id, String authorId, String title, String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt, LocalDateTime closedAt, Long milestoneId, boolean isOpen,
        boolean isDeleted) {
        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.closedAt = closedAt;
        this.milestoneId = milestoneId;
        this.isOpen = isOpen;
        this.isDeleted = isDeleted;
        this.isNew = false;
    }

    public static Issue from(Long id, String authorId, String title, String description, Long milestoneId,
        boolean isOpen) {
        Issue issue = new Issue(id, authorId, title, description, LocalDateTime.now(),
            LocalDateTime.now(), LocalDateTime.now(), milestoneId, isOpen, false);
        issue.isNew = true;
        return issue;
    }

}
