package codesquad.issuetracker.issue;

import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.label.LabelRepository;
import codesquad.issuetracker.user.User;
import codesquad.issuetracker.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;
    private final LabelRepository labelRepository;
    private final UserRepository userRepository;

    public void createIssue(Issue issue) {
        issueRepository.save(issue);
    }

    public List<Issue> getAllIssues() {
        return (List<Issue>) issueRepository.findAll();
    }

    public List<Label> getLabelsForIssue(Issue issue) {
        List<Long> labelIds = issue.getIssueLabels().stream()
                .map(IssueLabel::getLabelId)
                .toList();
        return (List<Label>) labelRepository.findAllById(labelIds);
    }

    public List<User> getAssigneesForIssue(Issue issue) {
        List<String> assigneeNames = issue.getIssueAssignees().stream()
                .map(IssueAssignee::getUserLoginId)
                .toList();
        return (List<User>) userRepository.findAllById(assigneeNames);
    }

    public Issue getIssue(Long issueId) {
        return issueRepository.findById(issueId).get();
    }

    public void updateIssueTitleById(Long issueId, String newTitle) {
        issueRepository.updateTitleById(issueId, newTitle);
    }

    public void updateIssueContentById(Long issueId, String newContent) {
        issueRepository.updateContentById(issueId, newContent);
    }
}
