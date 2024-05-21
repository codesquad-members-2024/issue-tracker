package com.codesquad.team3.issuetracker.domain.issue.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class IssueDetail {

    private Integer id;
    private Integer writerId;
    private String title;
    private LocalDateTime createTime;
}
