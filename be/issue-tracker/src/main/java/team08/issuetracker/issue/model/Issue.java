package team08.issuetracker.issue.model;


import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import org.springframework.data.annotation.Id;

@Getter
public class Issue {
    @Id
    private Long id;
    private final Boolean isOpen;// default : open // 생성시에는 클라이언트에서 값을 받지 않고, 수정 할 때 만 클라이언트에서 값 받는다.
    private final String title; //Non-Null
    private final String writer; //Non-Null
    private final String content;
    private final String uploadedFile;
    private final Object mileStone;
    private final List<Object> label;
    private final List<String> assignee;
    private final LocalDateTime createdTime;

    public Issue(String title, String writer, String content, String uploadedFile, Object mileStone, List<Object> label,
                 List<String> assignee) {
        this.isOpen = true;
        this.title = title;
        this.writer = writer;
        this.content = content;
        this.uploadedFile = uploadedFile;
        this.mileStone = mileStone;
        this.label = label;
        this.assignee = assignee;
        this.createdTime = LocalDateTime.now();
    }
}
