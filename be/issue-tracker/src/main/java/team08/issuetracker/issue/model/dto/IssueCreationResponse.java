package team08.issuetracker.issue.model.dto;

import lombok.Getter;
import team08.issuetracker.issue.model.Issue;

@Getter
public class IssueCreationResponse {
    private final Long id;
    private final String title;
    private final String message;

    private IssueCreationResponse(Issue issue) {
        this.id = issue.getId();
        this.title = issue.getTitle();
        this.message = String.format("이슈 생성 성공! 이슈 #%d 제목 : %s", id, title);
    }

    public static IssueCreationResponse from(Issue issue) {
        return new IssueCreationResponse(issue);
    }
}
