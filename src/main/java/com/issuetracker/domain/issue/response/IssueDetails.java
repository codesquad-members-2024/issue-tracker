package com.issuetracker.domain.issue.response;

import com.issuetracker.domain.comment.Comment;
import com.issuetracker.domain.label.Label;
import com.issuetracker.domain.member.response.SimpleMember;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class IssueDetails {

    private Long id;
    private String memberId;
    private String title;
    private String content;
    private List<Comment> comments;
    private boolean isOpen;
    private Set<SimpleMember> assignees;
    private Set<Label> labels;
    private String milestoneId;
    private Integer milestoneProgress;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
