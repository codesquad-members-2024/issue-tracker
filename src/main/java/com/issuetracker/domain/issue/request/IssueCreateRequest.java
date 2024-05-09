package com.issuetracker.domain.issue.request;

import com.issuetracker.domain.issue.Issue;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class IssueCreateRequest {

    @NotBlank
    private String memberId;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    public Issue toEntity() {
        return Issue.builder()
                .memberId(memberId)
                .title(title)
                .content(content)
                .build();
    }
}
