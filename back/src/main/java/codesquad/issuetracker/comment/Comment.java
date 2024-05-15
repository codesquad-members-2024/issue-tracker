package codesquad.issuetracker.comment;

import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Getter
public class Comment {

    @Id
    private Long id;
    private String writer;
    private String content;
    private LocalDateTime createdDate;

    public Comment(String writer, String content) {
        this.writer = writer;
        this.content = content;
        this.createdDate = LocalDateTime.now();
    }
}
