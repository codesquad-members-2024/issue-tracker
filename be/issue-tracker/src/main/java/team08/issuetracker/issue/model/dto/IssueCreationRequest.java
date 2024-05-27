package team08.issuetracker.issue.model.dto;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import team08.issuetracker.issue.model.Issue;
import team08.issuetracker.issue.ref.Assignee;
import team08.issuetracker.issue.ref.IssueAttachedLabel;

/**
 * 클라이언트로 부터 받을 수 있는 모든 값들
 *
 * @param title       Non-Null
 * @param writer      Non-Null
 * @param content     Nullable
 * @param createdAt   Non-Null
 * @param milestoneId Nullable
 * @param labelIds    Nullable
 * @param assigneeIds Nullable
 * @param file        Nullable
 */

public record IssueCreationRequest(String title, String writer, String content, Long milestoneId, String createdAt,
                                   List<Long> labelIds, List<String> assigneeIds, String file) {

    public Issue createIssue() {
        return new Issue(
                this.title,
                this.writer,
                this.content,
                getLocalDateTimeFromRequest(),
                this.file,
                this.milestoneId);
    }

    public Set<Assignee> createAssigneesWithIssueId(Long issueId) {
        return this.assigneeIds().stream()
                .map(eachAssigneeId -> new Assignee(issueId, eachAssigneeId))
                .collect(Collectors.toSet());
    }

    public Set<IssueAttachedLabel> createIssueAttachedLabelsWithIssueId(Long issueId) {
        return this.labelIds.stream()
                .map(eachLabelId -> new IssueAttachedLabel(issueId, eachLabelId))
                .collect(Collectors.toSet());
    }

    private LocalDateTime getLocalDateTimeFromRequest() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-M-d H:mm:ss");
        return LocalDateTime.parse(this.createdAt, formatter);
    }
}
