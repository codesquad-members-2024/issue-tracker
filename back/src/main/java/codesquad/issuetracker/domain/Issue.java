package codesquad.issuetracker.domain;

import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Getter
public class Issue {

    @Id
    private Long id;
    private String title;
    private String content;
    private String imageLink;
    private String milestoneId;
    private String manager;
    private String writer;
    private LocalDateTime createTime;
    private boolean isClosed; // 기본 값 false

//    Spring Data Jdbc의 연관관계 매핑을 위한 설정 예정
//    @MappedCollection(idColumn = "issue_id", keyColumn = "id")
//    private List<IssueLabel> labels = new ArrayList<>();

    public Issue(Long id,
                 String title,
                 String content,
                 String imageLink,
                 String milestoneId,
                 String manager,
                 String writer) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imageLink = imageLink;
        this.milestoneId = milestoneId;
        this.manager = manager;
        this.writer = writer;
        this.createTime = LocalDateTime.now();
    }
}
