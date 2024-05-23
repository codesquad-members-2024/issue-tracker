package com.CodeSquad.IssueTracker.filter;

import com.CodeSquad.IssueTracker.assignee.AssigneeService;
import com.CodeSquad.IssueTracker.filter.dto.FilterListResponse;
import com.CodeSquad.IssueTracker.issues.IssueService;
import com.CodeSquad.IssueTracker.labels.LabelService;
import com.CodeSquad.IssueTracker.milestone.MilestoneService;
import com.CodeSquad.IssueTracker.user.UserService;
import org.springframework.stereotype.Service;

@Service
public class FilterService {

    IssueService issueService;
    LabelService labelService;
    MilestoneService milestoneService;
    UserService userService;

    public FilterService(IssueService issueService, LabelService labelService,
                         MilestoneService milestoneService, UserService userService) {
        this.issueService = issueService;
        this.labelService = labelService;
        this.milestoneService = milestoneService;
        this.userService = userService;
    }

    public FilterListResponse getFilterListResponse() {
        return FilterListResponse.builder()
                .issueNumberResponse(issueService.getIssueNumber())
                .labelListResponse(labelService.getLabelList())
                .milestoneListResponse(milestoneService.getOpenMilestoneList())
                .userListResponse(userService.getAllUserIds())
                .build();
    }
}
