package com.issuetracker.domain.issue.request;

import com.issuetracker.domain.issue.Issue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class IssueCreateRequest {

    @NotBlank
    private String memberId;

    @NotBlank
    @Size(max = 120)
    private String title;

    @NotBlank
    @Size(max = 2000)
    private String content;

    public Issue toEntity() {
        return Issue.builder()
                .memberId(memberId)
                .title(title)
                .content(content)
                .build();
    }
}
