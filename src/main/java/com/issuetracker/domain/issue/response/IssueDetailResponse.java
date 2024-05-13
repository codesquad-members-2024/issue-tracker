package com.issuetracker.domain.issue.response;

import com.issuetracker.domain.issue.Issue;
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

    public static IssueDetailResponse from(Issue issue) {
        return IssueDetailResponse.builder()
                .id(issue.getId())
                .memberId(issue.getMemberId())
                .title(issue.getTitle())
                .content(issue.getContent())
                .build();
    }
}
