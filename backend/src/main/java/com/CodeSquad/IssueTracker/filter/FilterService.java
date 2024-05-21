package com.CodeSquad.IssueTracker.filter;

import com.CodeSquad.IssueTracker.filter.dto.FilterListResponse;
import com.CodeSquad.IssueTracker.issues.IssueRepository;
import com.CodeSquad.IssueTracker.issues.IssueService;
import com.CodeSquad.IssueTracker.labels.LabelService;
import com.CodeSquad.IssueTracker.milestone.Milestone;
import com.CodeSquad.IssueTracker.milestone.MilestoneRepository;
import com.CodeSquad.IssueTracker.milestone.MilestoneService;
import com.CodeSquad.IssueTracker.user.UserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FilterService {

    IssueService issueService;
    LabelService labelService;
    MilestoneService milestoneService;

    public FilterService(IssueService issueService, LabelService labelService, MilestoneService milestoneService) {
        this.issueService = issueService;
        this.labelService = labelService;
        this.milestoneService = milestoneService;
    }

    public FilterListResponse getFilterListResponse() {
        return FilterListResponse.builder()
                .issueNumberResponse(issueService.getIssueNumber())
                .labelListResponse(labelService.getLabelList())
                .milestoneListResponse(milestoneService.getOpenMilestoneList())
                .authorListResponse(issueService.getAuthorList())
                .build();
    }
}
