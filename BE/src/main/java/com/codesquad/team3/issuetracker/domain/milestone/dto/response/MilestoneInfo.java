package com.codesquad.team3.issuetracker.domain.milestone.dto.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Getter
@RequiredArgsConstructor
public class MilestoneInfo {

    private Integer id;
    private final String title;
    private final String description;
    private final LocalDate deadline;
    private MilestoneProgress progress;

}
