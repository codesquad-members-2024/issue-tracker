package team08.issuetracker.issue.model;


import java.time.LocalDateTime;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import team08.issuetracker.issue.ref.Assignee;

@Setter
@Getter
public class Issue {
    @Id
    private Long id;
    private boolean isOpen; // default : open 수정 할 때 만 클라이언트에서 값 받는다.
    private final String writer; //Non-Null
    private final String title; //Non-Null
    private final String content;
    private final String uploadedFile;
    @Column(value = "TIMESTAMP")
    private LocalDateTime createdTime;

    @MappedCollection(idColumn = "ISSUE_ID")
    private Set<Assignee> assignees;

    public Issue(String title, String writer, String content, String uploadedFile) {

        // issue 생성시 서버에서 초기화 값을 부여하는 필드들
        this.isOpen = true; // 이슈 생성시 true를 기본값으로 초기화 되어야 한다
        this.createdTime = LocalDateTime.now(); // 이슈 생성시, 생성 시간을 저장

        // issue 생성시 클라이언트에서 받은 값으로 초기화 하는 필드들
        this.title = title;
        this.writer = writer;
        this.content = content;
        this.uploadedFile = uploadedFile;
    }

    // 다대다 관계는 setter를 통해 저장
    public void setAssignees(Set<Assignee> assignees) {
        this.assignees = assignees;
    }

    @Override
    public String toString() {
        return "Issue{" +
                "id=" + id +
                ", isOpen=" + isOpen +
                ", title='" + title + '\'' +
                ", writer='" + writer + '\'' +
                ", content='" + content + '\'' +
                ", uploadedFile='" + uploadedFile + '\'' +
                ", assignee=" + assignees +
                ", createdTime=" + createdTime +
                '}';
    }
}
