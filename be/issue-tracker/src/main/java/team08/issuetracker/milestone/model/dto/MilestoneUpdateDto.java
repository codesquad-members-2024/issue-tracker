package team08.issuetracker.milestone.model.dto;

import lombok.Getter;

import java.time.LocalDate;

public record MilestoneUpdateDto(
        String name,
        String description,
        LocalDate completeDate
) {}
