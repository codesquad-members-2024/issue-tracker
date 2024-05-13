package codesquad.issuetracker.issue;

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
