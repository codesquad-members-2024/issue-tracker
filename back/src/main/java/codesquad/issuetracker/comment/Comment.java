package codesquad.issuetracker.comment;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Getter
public class Comment {

    @Id
    private Long id;
    private String content;
    @Setter
    private String loginId;
    private Long issueId;
    private LocalDateTime createdDate;

    public Comment(String content, String loginId, Long issueId) {
        this.content = content;
        this.loginId = loginId;
        this.issueId = issueId;
        this.createdDate = LocalDateTime.now();
    }
}
