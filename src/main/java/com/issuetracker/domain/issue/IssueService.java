package com.issuetracker.domain.issue;

import com.issuetracker.domain.issue.request.IssueCreateRequest;
import com.issuetracker.domain.issue.request.IssueUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;
    private final IssueMapper issueMapper;

    public Long create(IssueCreateRequest request) {
        Issue issue = request.toEntity();
        Issue savedIssue = issueRepository.save(issue);
        return savedIssue.getId();
    }

    public void edit(IssueUpdateRequest form) {
        if (form.getTitle() == null && form.getContent() == null) {
            throw new IllegalArgumentException();
        }

        issueMapper.update(form);
    }
}