package com.CodeSquad.IssueTracker.issues.dto;

import java.util.List;

public record IssueRequest(
        String title,
        String content,
        String author,
        List<String> assignees,
        List<Long> labels,
        String milestone,
        Long milestoneId
) {}