package com.CodeSquad.IssueTracker.issues.comment;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@Table("comments")
public class Comment {
    @Id
    private Long commentId;
    private Long issueId;
    private String content;
    private String author;
    private LocalDateTime publishedAt;
}