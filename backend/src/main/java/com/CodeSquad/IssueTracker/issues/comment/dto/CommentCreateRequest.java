package com.CodeSquad.IssueTracker.issues.comment.dto;

public record CommentCreateRequest (
        String author,
        String content
) {}
