package com.CodeSquad.IssueTracker.assignee.dao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@AllArgsConstructor
@Table("assignees")
public class AssigneeId {
    String userId;
}
