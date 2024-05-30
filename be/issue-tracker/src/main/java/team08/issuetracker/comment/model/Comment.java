package team08.issuetracker.comment.model;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import team08.issuetracker.comment.model.dto.CommentUpdateRequest;
import java.time.LocalDateTime;

@Getter
public class Comment {

    @Id
    private Long id;
    private String writer; // FK to User
    private Long issueId; // FK to Issue
    private String content;
    private LocalDateTime createdAt;
    private String uploadedFile;

    public Comment(String writer, Long issueId, String content, LocalDateTime createdAt, String uploadedFile) {
        this.writer = writer;
        this.issueId = issueId;
        this.content = content;
        this.createdAt = createdAt;
        this.uploadedFile = uploadedFile;
    }

    public Comment update(CommentUpdateRequest commentUpdateRequest){
        this.content = commentUpdateRequest.content();
        this.uploadedFile = commentUpdateRequest.uploadedFile();

        return this;
    }

    protected Comment(){
    }
}
