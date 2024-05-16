package com.CodeSquad.IssueTracker.filter;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class IssueNumberResponse {
    private Long openIssueCount;
    private Long closeIssueCount;
}
