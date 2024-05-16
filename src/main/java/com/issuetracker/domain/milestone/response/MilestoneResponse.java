package com.issuetracker.domain.milestone.response;

import com.issuetracker.domain.milestone.Milestone;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class MilestoneResponse {

    private Long id;
    private String name;
    private LocalDateTime dueDate;
    private String description;

    public static MilestoneResponse of(Milestone milestone) {
        return MilestoneResponse.builder()
                .id(milestone.getId())
                .name(milestone.getName())
                .dueDate(milestone.getDueDate())
                .description(milestone.getDescription())
                .build();
    }
}
