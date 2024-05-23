package team08.issuetracker.issue.model.dto;

import lombok.Getter;
import team08.issuetracker.issue.model.Issue;

@Getter
public class IssueUpdateResponse {
    private final Long id;
    private final String title;
    private final String message;

    private IssueUpdateResponse(Issue issue) {
        this.id = issue.getId();
        this.title = issue.getTitle();
        this.message = String.format("Issue의 정보가 업데이트 되었습니다. ID : %d, Title : %s, IsOpened : %s",
                issue.getId(), issue.getTitle(), issue.isOpen());
    }

    public static IssueUpdateResponse from(Issue issue) {
        return new IssueUpdateResponse(issue);
    }
}
