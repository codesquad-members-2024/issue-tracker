package codesquad.issuetracker.comment;

import java.time.LocalDateTime;
import lombok.Value;

@Value
public class CommentResponse {

    String authorId;
    String contents;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;

    public static CommentResponse of(Comment comment) {
        return new CommentResponse(comment.getAuthorId().getId(), comment.getContents(),
            comment.getCreatedAt(), comment.getUpdatedAt());
    }

}
