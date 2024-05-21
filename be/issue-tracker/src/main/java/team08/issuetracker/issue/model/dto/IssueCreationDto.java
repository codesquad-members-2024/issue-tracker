package team08.issuetracker.issue.model.dto;


import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import team08.issuetracker.issue.model.Issue;
import team08.issuetracker.issue.ref.Assignee;

/**
 * 클라이언트로 부터 받을 수 있는 모든 값들
 *
 * @param title       Non-Null
 * @param writer      Non-Null
 * @param content     Nullable
 * @param milestoneId   Nullable
 * @param labelIds      Nullable
 * @param assigneeIds Nullable
 * @param file        Nullable
 */
public record IssueCreationDto(
        String title,
        String writer,
        String content,
        Long milestoneId,
        List<Long> labelIds,
        List<String> assigneeIds,
        String file) {

    public Issue createIssue() {
        return new Issue(
                this.title,
                this.writer,
                this.content,
                this.file);
    }

    public Set<Assignee> createAssigneesWithIssueId(Long issueId) {
        return this.assigneeIds().stream()
                .map(eachAssigneeId -> new Assignee(issueId, eachAssigneeId))
                .collect(Collectors.toSet());
    }
}
