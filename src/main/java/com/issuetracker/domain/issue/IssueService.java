package com.issuetracker.domain.issue;

import com.issuetracker.domain.issue.request.IssueCreateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;

    public Long create(IssueCreateRequest request) {
        Issue issue = request.toEntity();
        Issue savedIssue = issueRepository.save(issue);
        return savedIssue.getId();
    }
}
