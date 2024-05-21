package codesquad.issuetracker.issue;

import codesquad.issuetracker.comment.Comment;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
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

    public void open() {
        isClosed = false;
    }

    public void close() {
        isClosed = true;
    }

    public void addAssignee(List<String> userLoginIds) {
        for (String userLoginId : userLoginIds) {
            issueAssignees.add(IssueAssignee.builder()
                    .userLoginId(userLoginId)
                    .build()
            );
        }
    }

    public void addLabel(List<Long> labelIds) {
        for (Long labelId : labelIds) {
            issueLabels.add(IssueLabel.builder()
                    .labelId(labelId)
                    .build()
            );
        }
    }

    public void addMilestone(Long milestoneId) {
        this.milestoneId = milestoneId;
    }

    public void deleteAssignee(List<String> userLoginIds) {
        issueAssignees.removeIf(issueAssignee -> userLoginIds.contains(issueAssignee.getUserLoginId()));
    }

    public void deleteLabel(List<Long> labelIds) {
        issueLabels.removeIf(issueLabel -> labelIds.contains(issueLabel.getLabelId()));
    }

    public void deleteMilestone() {
        this.milestoneId = null;
    }
}