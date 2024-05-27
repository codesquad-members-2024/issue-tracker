package com.CodeSquad.IssueTracker.issues.dto;

import com.CodeSquad.IssueTracker.issues.issueLabel.dto.LabelRequest;
import lombok.Getter;

import java.time.LocalDateTime;


//i.issue_id, i.title, i.author, i.published_at, i.is_closed, i.milestone_id, " +
//            "a.user_id AS assignee, l.label_id , l.label_name, l.bg_color, l.text_color
@Getter
public class IssueDetailAccess {
    private Long issueId;

    private String title;

    private String author;

    private LocalDateTime publishedAt;

    private Boolean isClosed;

    private String assignee;

    private Long labelId;

    private String labelName;

    private String bgColor;

    private String textColor;

    private Long milestoneId;
}
