package team08.issuetracker.issue.model.dto.update;

import team08.issuetracker.exception.issue.InvalidIssueTitleUpdateFormException;

public record IssueTitleUpdateRequest(String title) {

    public IssueTitleUpdateRequest {
        if (title == null || title.isEmpty()) {
            throw new InvalidIssueTitleUpdateFormException();
        }
    }
}
