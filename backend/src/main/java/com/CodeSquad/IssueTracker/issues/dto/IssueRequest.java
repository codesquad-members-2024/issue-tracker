package com.CodeSquad.IssueTracker.issues.dto;

import java.util.List;
import java.util.Optional;

public record IssueRequest(
        String title,
        Optional<String> content,
        String author,
        List<String> assignees,
        List<String> labels,
        String milestone,
        Long milestoneId
) {}