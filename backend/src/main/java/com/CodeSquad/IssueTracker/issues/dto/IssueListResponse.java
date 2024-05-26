package com.CodeSquad.IssueTracker.issues.dto;


import lombok.Builder;
import lombok.Getter;
import org.springframework.data.relational.core.mapping.Column;

@Getter
@Builder
public class IssueListResponse {
    private Long issueId;
    private String title;
    private String publishedAt;
    private String author;
    @Column("isClosed")
    private boolean isClosed;

}
