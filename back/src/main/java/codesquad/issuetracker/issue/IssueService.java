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

    public List<Issue> getAllIssues() {
        return (List<Issue>) issueRepository.findAll();
    }

    public List<Label> getLabelsForIssue(Issue issue) {
        List<String> labelNames = issue.getLabels().stream()
                .map(IssueLabel::getLabelName)
                .toList();
        return (List<Label>) labelRepository.findAllById(labelNames);
    }

    public List<User> getAssigneesForIssue(Issue issue) {
        List<String> assigneeNames = issue.getAssignees().stream()
                .map(IssueAssignee::getUserLoginId)
                .toList();
        return (List<User>) userRepository.findAllById(assigneeNames);
    }
}
