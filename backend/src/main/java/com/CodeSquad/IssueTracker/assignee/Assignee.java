package com.CodeSquad.IssueTracker.assignee;


import lombok.Getter;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Table("assignees")
public class Assignee {
    private Long issueId;
    private String userId;
}
