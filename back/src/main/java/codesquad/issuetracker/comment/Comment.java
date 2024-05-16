package codesquad.issuetracker.comment;

import lombok.Getter;
import org.springframework.data.annotation.Id;

@Getter
public class Comment {

    @Id
    private Long id;
    private String writer;
    private String content;

    public Comment(String writer, String content) {
        this.writer = writer;
        this.content = content;
    }
}
