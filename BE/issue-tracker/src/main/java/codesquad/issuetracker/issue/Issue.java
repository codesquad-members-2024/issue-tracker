package codesquad.issuetracker.issue;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.relational.core.mapping.MappedCollection;

@Getter
@ToString
public class Issue {

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
    private Set<IssueAttachedLabel> labelRefs = new HashSet<>();
    @MappedCollection(idColumn = "ISSUE_ID")
    private Set<Long> assigneeIds = new HashSet<>();

    @Builder
    @PersistenceCreator
    public Issue(Long id, String authorId, String title, String description,
        LocalDateTime openAt,
        LocalDateTime updatedAt, LocalDateTime closedAt, Long milestoneId, boolean isOpen,
        boolean isDeleted, Set<IssueAttachedLabel> labelRefs, Set<Long> assigneeIds) {
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
        this.assigneeIds = assigneeIds;
    }

    public static Issue from(String authorId, String title, String description,
        Long milestoneId, Set<IssueAttachedLabel> labelRefs, Set<Long> assigneeIds) {
        return Issue.builder()
            .authorId(authorId)
            .title(title)
            .description(description)
            .openAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .closedAt(LocalDateTime.now())
            .milestoneId(milestoneId)
            .isOpen(true)
            .isDeleted(false)
            .labelRefs(labelRefs)
            .assigneeIds(assigneeIds)
            .build();
    }

}
