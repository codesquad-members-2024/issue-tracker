package team08.issuetracker.issue.model.dto;

import lombok.Getter;

@Getter
public class IssueDeleteResponse {
    private final long id;
    private final String message;

    private IssueDeleteResponse(long id) {
        this.id = id;
        this.message = String.format("이슈 삭제 성공! 이슈 #%d", id);
    }

    public static IssueDeleteResponse from(long id) {
        return new IssueDeleteResponse(id);
    }
}
