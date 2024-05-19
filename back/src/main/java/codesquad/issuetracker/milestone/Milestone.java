package codesquad.issuetracker.milestone;

import codesquad.issuetracker.issue.Issue;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
public class Milestone {

    @Id
    private Long id;
    private String name;
    private String description;
    private LocalDateTime createTime;
    private LocalDateTime dueDate;
    private boolean isClosed;
    @MappedCollection(idColumn = "milestone_id")
    private Set<Issue> issues;

    public Milestone(Long id,
                     String name,
                     String description,
                     LocalDateTime createTime,
                     LocalDateTime dueDate,
                     boolean isClosed) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createTime = createTime;
        this.dueDate = dueDate;
        this.isClosed = isClosed;
    }
}
