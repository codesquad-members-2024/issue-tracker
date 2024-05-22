package com.CodeSquad.IssueTracker.filter.dto;

import com.CodeSquad.IssueTracker.issues.dto.AuthorListResponse;
import com.CodeSquad.IssueTracker.issues.dto.IssueNumberResponse;
import com.CodeSquad.IssueTracker.labels.dto.LabelListResponse;
import com.CodeSquad.IssueTracker.milestone.dto.MilestoneListResponse;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class FilterListResponse {
    private IssueNumberResponse issueNumberResponse;
    private List<String> assigneeListResponse;
    private List<LabelListResponse> labelListResponse;
    private List<MilestoneListResponse> milestoneListResponse;
    private List<AuthorListResponse> authorListResponse;
}
