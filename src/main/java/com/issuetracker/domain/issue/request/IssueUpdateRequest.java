package com.issuetracker.domain.issue.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IssueUpdateRequest {

    @NotNull(message = "Issue Id가 Null 일 수 없습니다")
    private Long issueId;
    private String title;
    private String content;
}
