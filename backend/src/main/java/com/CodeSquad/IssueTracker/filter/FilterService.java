package com.CodeSquad.IssueTracker.filter;

import com.CodeSquad.IssueTracker.assignee.AssigneeService;
import com.CodeSquad.IssueTracker.filter.dto.FilterListResponse;
import com.CodeSquad.IssueTracker.issues.IssueService;
import com.CodeSquad.IssueTracker.labels.LabelService;
import com.CodeSquad.IssueTracker.milestone.MilestoneService;
import org.springframework.stereotype.Service;

@Service
public class FilterService {

    AssigneeService assigneeService;
    IssueService issueService;
    LabelService labelService;
    MilestoneService milestoneService;

    public FilterService(AssigneeService assigneeService, IssueService issueService,
                         LabelService labelService, MilestoneService milestoneService) {
        this.assigneeService = assigneeService;
        this.issueService = issueService;
        this.labelService = labelService;
        this.milestoneService = milestoneService;
    }

    public FilterListResponse getFilterListResponse() {
        return FilterListResponse.builder()
                .assigneeListResponse(assigneeService.getAllAssignees())
                .issueNumberResponse(issueService.getIssueNumber())
                .labelListResponse(labelService.getLabelList())
                .milestoneListResponse(milestoneService.getOpenMilestoneList())
                .authorListResponse(issueService.getAuthorList())
                .build();
    }
}
