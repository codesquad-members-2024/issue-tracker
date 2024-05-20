package codesquad.issuetracker.issue;

import codesquad.issuetracker.comment.Comment;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
public class Issue {

    @Id
    private Long id;
    private String title;
    private String content;
    private Long milestoneId;
    @MappedCollection(idColumn = "issue_id")
    private Set<IssueAssignee> issueAssignees;
    private String writer;
    private LocalDateTime createTime;
    private boolean isClosed; // 기본 값 false
    @MappedCollection(idColumn = "issue_id")
    private Set<IssueLabel> issueLabels;
    @MappedCollection(idColumn = "issue_id")
    private Set<Comment> comments;

    public Issue(String title,
                 String content,
                 Long milestoneId,
                 String writer) {
        this.title = title;
        this.content = content;
        this.milestoneId = milestoneId;
        this.issueAssignees = new HashSet<>();
        this.writer = writer;
        this.createTime = LocalDateTime.now();
        this.issueLabels = new HashSet<>();
        this.comments = new HashSet<>();
    }
}