package team08.issuetracker.comment.model.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import team08.issuetracker.comment.model.Comment;

import java.time.LocalDateTime;

@Getter
public class CommentSummaryDto {
    private final String writer;
    private final String content;
    private final LocalDateTime createdAt;
    private final String imageUrl;

    public CommentSummaryDto(Comment comment, String imageUrl) {
        this.writer = comment.getWriter();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt();
        this.imageUrl = imageUrl;
    }
}
