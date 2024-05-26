package team08.issuetracker.issue.model.dto.update;

import team08.issuetracker.exception.issue.InvalidIssueUpdateFormException;

public record IssueTitleUpdateRequest(String title) {

    public IssueTitleUpdateRequest {
        if (title == null || title.isEmpty()) {
            throw new InvalidIssueUpdateFormException();
        }
    }
}
