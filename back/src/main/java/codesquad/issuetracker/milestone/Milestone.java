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
                     LocalDateTime dueDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createTime = LocalDateTime.now();
        this.dueDate = dueDate;
    }

    public Long countOpenIssue() {
        return issues.stream()
                .filter(issue -> !issue.isClosed())
                .count();
    }

    public Long countCloseIssue() {
        return issues.stream()
                .filter(issue -> issue.isClosed())
                .count();
    }

    public int calculateProgress() {
        if (issues.isEmpty()) {
            return 0;
        }
        return (int) ((double) countCloseIssue() / issues.size() * 100);
    }
}
