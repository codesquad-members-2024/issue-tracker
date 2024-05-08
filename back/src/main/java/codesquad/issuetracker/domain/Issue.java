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
    private String profileImage;
    private String milestoneId;
    private String labelId;
    private String manager;
    private String writer;
    private LocalDateTime createTime;
    private boolean deleted;

    public Issue(Long id,
                 String title,
                 String content,
                 String profileImage,
                 String milestoneId,
                 String labelId,
                 String manager,
                 String writer) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.profileImage = profileImage;
        this.milestoneId = milestoneId;
        this.labelId = labelId;
        this.manager = manager;
        this.writer = writer;
        this.createTime = LocalDateTime.now();
        this.deleted = false;
    }
}
