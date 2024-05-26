package codesquad.issuetracker.issue;

import codesquad.issuetracker.comment.Comment;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
                 Long milestoneId) {
        this.title = title;
        this.content = content;
        this.milestoneId = milestoneId;
        this.issueAssignees = new HashSet<>();
        this.writer = "test3@example.com";
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

    public boolean checkFilter(List<String> assigneeIds, List<Long> labelIds, Long milestoneId, String writer) {
        Set<String> issueUserLoginIds = issueAssignees.stream().map(IssueAssignee::getUserLoginId).collect(Collectors.toSet());
        boolean checkAssignee = assigneeIds == null || assigneeIds.stream().anyMatch(issueUserLoginIds::contains);

        Set<Long> issueLabelIds = issueLabels.stream().map(IssueLabel::getLabelId).collect(Collectors.toSet());
        boolean checkLabel = labelIds == null || labelIds.stream().anyMatch(issueLabelIds::contains);

        boolean checkMilestone = milestoneId == null || this.milestoneId.equals(milestoneId);

        boolean checkWriter = writer == null || this.writer.equals(writer);

        return checkAssignee && checkLabel && checkMilestone && checkWriter;
    }
}