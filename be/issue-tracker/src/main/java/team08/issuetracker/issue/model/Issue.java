package team08.issuetracker.issue.model;


import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import team08.issuetracker.issue.Assignee;
import team08.issuetracker.issue.IssueAttachedLabel;

@Getter
public class Issue {
    @Id
    private Long id;
    private final Boolean isOpen;// default : open 수정 할 때 만 클라이언트에서 값 받는다.
    private final String title; //Non-Null
    private final String writer; //Non-Null
    private final String content;
    private final String uploadedFile;
    private final Object milestoneId;
//    private final List<Object> label;
//    private final List<String> assignee;
    @Column(value = "TIMESTAMP")
    private final LocalDateTime createdTime;

//    @MappedCollection(idColumn = "issue_id")
//    private Set<IssueAttachedLabel> labels = new HashSet<>();
//
//    @MappedCollection(idColumn = "issue_id")
//    private Set<Assignee> assignees = new HashSet<>();

    public Issue(String title, String writer, String content, String uploadedFile, Object milestoneId, List<Object> label,
                 List<String> assignee) {
        this.isOpen = true; // 이슈 생성시 true를 기본값으로 초기화 되어야 한다
        this.createdTime = LocalDateTime.now(); // 이슈 생성시간을 저장한다

        // 클라이언트로 부터 받은 값들로 초기화 한다
        // title 과 writer 를 제외한 값들은 nullable 이다
        this.title = title;
        this.writer = writer;
        this.content = content;
        this.uploadedFile = uploadedFile;
        this.milestoneId = milestoneId;
//        this.label = label;
//        this.assignee = assignee;
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
                ", milestone=" + milestoneId +
//                ", label=" + label +
//                ", assignee=" + assignee +
                ", createdTime=" + createdTime +
                '}';
    }
}
