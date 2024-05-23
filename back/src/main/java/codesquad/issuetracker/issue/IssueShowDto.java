package codesquad.issuetracker.issue;

import codesquad.issuetracker.comment.CommentShowDto;
import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.label.LabelShowDto;
import codesquad.issuetracker.milestone.Milestone;
import codesquad.issuetracker.milestone.MilestoneShowDto;
import codesquad.issuetracker.user.AssigneeShowDto;
import codesquad.issuetracker.user.User;
import codesquad.issuetracker.util.TimeCalculator;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class IssueShowDto {
    private Long id;
    private String title;
    private String content;
    private MilestoneShowDto milestone;
    private List<AssigneeShowDto> assignees;
    private String writer;
    private String duration;
    private boolean isClosed; // 기본 값 false
    private List<LabelShowDto> labels;
    private List<CommentShowDto> comments;

    public IssueShowDto(Issue issue, List<Label> labels, List<User> assignees, Milestone milestone) {
        this.id = issue.getId();
        this.title = issue.getTitle();
        this.content = issue.getContent();
        this.milestone = new MilestoneShowDto(milestone);
        this.assignees = assignees.stream()
                .map(user -> new AssigneeShowDto(user))
                .collect(Collectors.toList());
        this.writer = issue.getWriter();
        this.duration = TimeCalculator.calculateTimeDifference(issue.getCreateTime());
        this.isClosed = issue.isClosed();
        this.labels = labels.stream()
                .map(label -> new LabelShowDto(label))
                .collect(Collectors.toList());
        this.comments = issue.getComments().stream()
                .map(comment -> new CommentShowDto(comment))
                .collect(Collectors.toList());
    }
}