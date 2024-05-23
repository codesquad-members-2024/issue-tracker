package team08.issuetracker.comment.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import team08.issuetracker.comment.model.Comment;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class CommentCreationRequest {
    private String writer;
    private Long issueId;
    private String content;
    private LocalDateTime createdAt;
    private String uploadedFile;

    public Comment toEntity() {
        return new Comment(writer, issueId, content, createdAt, uploadedFile);
    }
}
