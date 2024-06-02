package com.issuetracker.domain.issue.response;

import com.issuetracker.domain.label.Label;
import com.issuetracker.domain.member.response.SimpleMember;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class SimpleIssue {

    private Long issueId;
    private String memberId;
    private String title;
    private boolean isOpen;
    private Set<SimpleMember> assignees;
    private Set<Label> labels;
    private String milestoneId;
    private LocalDateTime createdAt;
}
