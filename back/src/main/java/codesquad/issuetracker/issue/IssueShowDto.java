package codesquad.issuetracker.issue;

import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.label.LabelShowDto;
import codesquad.issuetracker.user.AssigneeShowDto;
import codesquad.issuetracker.user.User;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class IssueShowDto {
    private Long id;
    private String title;
    private String content;
    private String milestoneId;
    private List<AssigneeShowDto> assignees;
    private String writer;
    private LocalDateTime createTime;
    private boolean isClosed; // 기본 값 false
    private List<LabelShowDto> labels;

    public IssueShowDto(Issue issue, List<Label> labels, List<User> assignees) {
        this.id = issue.getId();
        this.title = issue.getTitle();
        this.content = issue.getContent();
        this.milestoneId = issue.getMilestoneId();
        this.assignees = assignees.stream()
                .map(user -> new AssigneeShowDto(user))
                .collect(Collectors.toList());
        this.writer = issue.getWriter();
        this.createTime = issue.getCreateTime();
        this.isClosed = issue.getIsClosed();
        this.labels = labels.stream()
                .map(label -> new LabelShowDto(label))
                .collect(Collectors.toList());
    }
}