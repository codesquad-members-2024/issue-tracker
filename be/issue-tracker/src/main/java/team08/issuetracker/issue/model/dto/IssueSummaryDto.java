package team08.issuetracker.issue.model.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import team08.issuetracker.issue.model.Issue;

@Getter
public class IssueSummaryDto {
    private final Long id;
    private final String title;
    private final String content;
    private final String writer;
    private final String imageUrl;
    private final boolean state;
    private final LocalDateTime createdAt;

    private IssueSummaryDto(Long id, String title, String content, String writer, String imageUrl, boolean state, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.imageUrl = imageUrl;
        this.state = state;
        this.createdAt = createdAt;
    }

    public static IssueSummaryDto from(Issue issue, String imageUrl) {
        return new IssueSummaryDto(issue.getId(), issue.getTitle(), issue.getContent(), issue.getWriter(), imageUrl, issue.isOpen(), issue.getCreatedAt());
    }
}
