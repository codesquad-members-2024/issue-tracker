package team08.issuetracker.issue.model.dto.update;

import lombok.Getter;
import team08.issuetracker.issue.model.Issue;

@Getter
public class IssueUpdateResponse {
    private final String message;

    private IssueUpdateResponse(Issue issue) {
        this.message = String.format("""
                        Issue의 정보가 업데이트 되었습니다.\r
                         id : %d\r
                         isOpen : %b\r
                         writer : %s\r
                         title : %s\r
                         content : %s\r
                         file: %s\r
                         milestoneId : %d\r
                         timestamp : %s\r
                         assigneeIds : %s\r
                         labelIds : %s""",
                issue.getId(),
                issue.isOpen(),
                issue.getWriter(),
                issue.getTitle(),
                issue.getContent(),
                issue.getUploadedFile(),
                issue.getMilestoneId(),
                issue.getCreatedAt().toString(),
                issue.getAssignees().toString(),
                issue.getIssueAttachedLabels().toString());
    }

    public static IssueUpdateResponse from(Issue issue) {
        return new IssueUpdateResponse(issue);
    }
}
