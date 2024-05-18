package com.CodeSquad.IssueTracker.filter;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MilestoneFilterResponse {
    private Long milestoneId;
    private String title;
}
