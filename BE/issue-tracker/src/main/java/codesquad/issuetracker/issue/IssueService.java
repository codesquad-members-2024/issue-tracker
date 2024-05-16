package codesquad.issuetracker.issue;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    @Autowired
    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public List<Issue> findIssuesByIsOpen(boolean isOpen) {
        return issueRepository.findAllByIsOpen(isOpen);
    }

    public List<Issue> findAllIssues() {
        return (List<Issue>) issueRepository.findAll();
    }

    public List<Issue> findAllByLabelId(Long labelId) {
        return issueRepository.findAllByLabelId(labelId);
    }

    public Issue create(Issue issue) {
        return issueRepository.save(issue);
    }

    public Issue findIssueById(Long issueId) {
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        return optionalIssue.orElseThrow(IllegalArgumentException::new);
    }
}
