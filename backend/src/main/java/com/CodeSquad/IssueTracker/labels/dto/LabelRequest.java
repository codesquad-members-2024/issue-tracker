package com.CodeSquad.IssueTracker.labels.dto;

public record LabelRequest(
        String labelName,
        String description,
        String textColor,
        String bgColor
) {
}
