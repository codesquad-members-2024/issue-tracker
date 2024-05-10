package com.issuetracker.domain.issue.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class IssueDetailResponse {

    private Long id;
    private String memberId;
    private String title;
    private String content;
}
