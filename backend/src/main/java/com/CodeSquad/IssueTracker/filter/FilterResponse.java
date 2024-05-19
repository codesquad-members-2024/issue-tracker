package com.CodeSquad.IssueTracker.filter;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class FilterResponse {
    private IssueNumberResponse issueNumberResponse;
    private List<MilestoneFilterResponse> milestoneFilterResponse;
}
