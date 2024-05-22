package com.CodeSquad.IssueTracker.issues.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.Optional;

public record IssueRequest(
        @NotBlank(message = "제목이 필요합니다.")
        @Size(max = 60, message = "제목이 너무 깁니다.")
        String title,
        Optional<String> content,
        @NotBlank(message = "작성자 정보가 필요합니다.")
        String author,
        List<String> assignees,
        List<Long> labels,
        String milestone,
        Long milestoneId
) {}