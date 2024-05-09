package codesquad.issuetracker.comment;


import java.time.LocalDateTime;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
public class Comment {

    @Id
    private Long id;
    private String author;
    private String contents;
    private String userId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
