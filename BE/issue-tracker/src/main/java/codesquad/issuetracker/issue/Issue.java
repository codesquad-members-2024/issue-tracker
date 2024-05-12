package codesquad.issuetracker.issue;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.MappedCollection;

@Getter
@ToString
public class Issue implements Persistable<Long> {

    @Id
    private Long id;
    private String authorId;
    private String title;
    private String description;
    private LocalDateTime openAt;
    private LocalDateTime updatedAt;
    private LocalDateTime closedAt;
    private Long milestoneId;
    private boolean isOpen;
    private boolean isDeleted;
    @MappedCollection(idColumn = "ISSUE_ID")
    private Set<LabelRef> labelRefs = new HashSet<>();
    @Transient
    private boolean isNew;

    @Override
    public boolean isNew() {
        return isNew;
    }

    @Builder
    @PersistenceCreator
    public Issue(Long id, String authorId, String title, String description,
        LocalDateTime openAt,
        LocalDateTime updatedAt, LocalDateTime closedAt, Long milestoneId, boolean isOpen,
        boolean isDeleted, Set<LabelRef> labelRefs) {
        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.description = description;
        this.openAt = openAt;
        this.updatedAt = updatedAt;
        this.closedAt = closedAt;
        this.milestoneId = milestoneId;
        this.isOpen = isOpen;
        this.isDeleted = isDeleted;
        this.labelRefs = labelRefs;
        this.isNew = false;
    }

    public static Issue from(Long id, String authorId, String title, String description,
        Long milestoneId, Set<LabelRef> labelRefs) {
        Issue issue = new Issue(id, authorId, title, description, LocalDateTime.now(),
            LocalDateTime.now(), LocalDateTime.now(), milestoneId, true, false, labelRefs);
        issue.isNew = true;
        return issue;
    }

}
