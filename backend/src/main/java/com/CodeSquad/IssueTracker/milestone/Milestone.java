package com.CodeSquad.IssueTracker.milestone;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;

@Setter
@Getter
@AllArgsConstructor

@Table("milestone")
public class Milestone {
    @Id
    private Long milestoneId;

    private String title;

    private String description;

    private Timestamp deadline;

    private Integer totalIssue;

    private Integer closedIssue;
}
