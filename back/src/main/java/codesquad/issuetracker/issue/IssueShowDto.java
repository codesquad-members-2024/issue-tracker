package codesquad.issuetracker.issue;

import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class IssueShowDto {
    private Long id;
    private String title;
    private String content;
    private String milestoneId;
    private List<User> assignees;
    private String writer;
    private LocalDateTime createTime;
    private boolean isClosed; // 기본 값 false
    private List<Label> labels;
}