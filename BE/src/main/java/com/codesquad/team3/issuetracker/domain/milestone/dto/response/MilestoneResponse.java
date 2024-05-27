package com.codesquad.team3.issuetracker.domain.milestone.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class MilestoneResponse {
    private Integer id;
    private String title;
    private String description;
    private LocalDate deadLine;
}
