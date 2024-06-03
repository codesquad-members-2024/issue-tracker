package team08.issuetracker.comment.model.dto;

import lombok.Getter;
import team08.issuetracker.comment.model.Comment;

import java.time.LocalDateTime;

@Getter
public class CommentResponse {
    private final Long id;
    private final String writer; // FK to User
    private final Long issueId; // FK to Issue
    private final String content;
    private final LocalDateTime createdAt;
    private final String uploadedFile;

    public CommentResponse(Comment comment) {
        this.id = comment.getId();
        this.writer = comment.getWriter();
        this.issueId = comment.getIssueId();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt();
        this.uploadedFile = comment.getUploadedFile();
    }

    public static CommentResponse from(Comment comment) {
        return new CommentResponse(comment);
    }
}
