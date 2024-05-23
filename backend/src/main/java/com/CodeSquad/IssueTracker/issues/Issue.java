package com.CodeSquad.IssueTracker.issues;

import com.CodeSquad.IssueTracker.assignee.dto.AssigneeId;
import com.CodeSquad.IssueTracker.issues.issueLabel.dto.LabelId;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Builder
@Table("issues")
public class Issue {
    @Id
    private Long issueId;

    private String title;

    private String author;

    private LocalDateTime publishedAt;

    private Boolean isClosed;

    private Long milestoneId;
    @Setter
    @MappedCollection(idColumn = "issue_id")
    private Set<AssigneeId> assignees;
    @Setter
    @MappedCollection(idColumn = "issue_id")
    private Set<LabelId> labels;

}