package codesquad.issuetracker.service;

import codesquad.issuetracker.domain.Issue;
import codesquad.issuetracker.repository.IssueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;

    public List<Issue> getAllIssues() {
        return issueRepository.findAllIssues();
    }
}
