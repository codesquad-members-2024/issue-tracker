package com.CodeSquad.IssueTracker.milestone.dto;

import lombok.Getter;

@Getter
public class MilestoneRequest {
    private Long milestoneId;

    private String title;

    private String description;

    private String deadline;

    private Integer totalIssue;

    private Integer closedIssue;
}
