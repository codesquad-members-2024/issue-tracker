package com.CodeSquad.IssueTracker.filter;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class IssueNumberResponse {
    private Long openedIssueNumber;
    private Long closedIssueNumber;
}
