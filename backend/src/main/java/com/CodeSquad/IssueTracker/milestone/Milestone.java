package com.CodeSquad.IssueTracker.milestone;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;

@Setter
@Getter

@Table("milestone")
public class Milestone {
    @Id
    private Long milestoneId;

    private String title;

    private String description;

    private Timestamp deadline;

    private Integer totalIssue;

    private Integer closedIssue;

    private Boolean isClosed = false;

    public Milestone(Long milestoneId, String title, String description, Timestamp deadline, Integer totalIssue, Integer closedIssue) {
        this.milestoneId = milestoneId;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.totalIssue = totalIssue;
        this.closedIssue = closedIssue;
    }
}
