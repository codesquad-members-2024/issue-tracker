package com.CodeSquad.IssueTracker.filter;

import com.CodeSquad.IssueTracker.issues.IssueRepository;
import org.springframework.stereotype.Service;

@Service
public class FilterService {

    IssueRepository issueRepository;

    public FilterService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public IssueNumberResponse getIssueNumber() {
        long openIssueNum = issueRepository.countOpenIssues();
        long closeIssueNum = issueRepository.countCloseIssues();
        return IssueNumberResponse.builder()
                .openIssueCount(openIssueNum)
                .closeIssueCount(closeIssueNum)
                .build();
    }
}
