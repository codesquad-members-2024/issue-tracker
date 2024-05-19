package com.CodeSquad.IssueTracker.filter;

import com.CodeSquad.IssueTracker.issues.IssueRepository;
import com.CodeSquad.IssueTracker.milestone.Milestone;
import com.CodeSquad.IssueTracker.milestone.MilestoneRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FilterService {

    IssueRepository issueRepository;
    MilestoneRepository milestoneRepository;

    public FilterService(IssueRepository issueRepository, MilestoneRepository milestoneRepository) {
        this.issueRepository = issueRepository;
        this.milestoneRepository = milestoneRepository;
    }

    public IssueNumberResponse getIssueNumber() {
        long openIssueNum = issueRepository.countOpenIssues();
        long closeIssueNum = issueRepository.countCloseIssues();
        return IssueNumberResponse.builder()
                .openIssueCount(openIssueNum)
                .closeIssueCount(closeIssueNum)
                .build();
    }

    public List<MilestoneFilterResponse> getMilestoneFilter() {
        List<Milestone> openMilestone = milestoneRepository.findAllOpenMilestones();
        List<MilestoneFilterResponse> milestoneFilterResponses = new ArrayList<>();

        for (Milestone milestone : openMilestone) {
            milestoneFilterResponses.add (MilestoneFilterResponse.builder()
                    .milestoneId(milestone.getMilestoneId())
                    .title(milestone.getTitle())
                    .build());
        }

        return milestoneFilterResponses;
    }

    public FilterResponse getFilterResponse() {
        return FilterResponse.builder()
                .issueNumberResponse(getIssueNumber())
                .milestoneFilterResponse(getMilestoneFilter())
                .build();
    }
}
