package codesquad.issuetracker.comment;

import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Getter
public class Comment {

    @Id
    private Long id;
    private String content;
    private String loginId;
    private Long issueId;
    private LocalDateTime createdDate;

    public Comment(String content, Long issueId) {
        this.content = content;
        this.loginId = "test3@example.com";
        this.issueId = issueId;
        this.createdDate = LocalDateTime.now();
    }
}
