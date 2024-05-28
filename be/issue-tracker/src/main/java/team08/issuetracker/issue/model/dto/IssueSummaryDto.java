package team08.issuetracker.issue.model.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import team08.issuetracker.issue.model.Issue;

@Getter
public class IssueSummaryDto {
    private final Long issueId;
    private final String issueTitle;
    private final boolean issueState;
    private final LocalDateTime issueCreateAt;

    private IssueSummaryDto(Long issueId, String issueTitle, boolean issueState, LocalDateTime issueCreateAt) {
        this.issueId = issueId;
        this.issueTitle = issueTitle;
        this.issueState = issueState;
        this.issueCreateAt = issueCreateAt;
    }

    public static IssueSummaryDto from(Issue issue) {
        return new IssueSummaryDto(issue.getId(), issue.getTitle(), issue.isOpen(), issue.getCreatedAt());
    }
}
