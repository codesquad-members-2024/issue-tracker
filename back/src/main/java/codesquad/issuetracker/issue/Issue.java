package codesquad.issuetracker.issue;

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
    private String milestoneId;
    @MappedCollection(idColumn = "issue_id")
    private Set<IssueAssignee> assignees;
    private String writer;
    private LocalDateTime createTime;
    private boolean isClosed; // 기본 값 false
    @MappedCollection(idColumn = "issue_id")
    private Set<IssueLabel> labels;

    public Issue(Long id,
                 String title,
                 String content,
                 String milestoneId,
                 String writer) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.milestoneId = milestoneId;
        this.assignees = new HashSet<>();
        this.writer = writer;
        this.createTime = LocalDateTime.now();
        this.labels = new HashSet<>();
    }

    public boolean getIsClosed() { // isClosed에 자동으로 getter가 생성되지 않아 추가
        return isClosed;
    }
}