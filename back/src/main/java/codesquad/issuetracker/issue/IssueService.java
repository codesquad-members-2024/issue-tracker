package codesquad.issuetracker.issue;

import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.label.LabelRepository;
import codesquad.issuetracker.milestone.Milestone;
import codesquad.issuetracker.milestone.MilestoneRepository;
import codesquad.issuetracker.user.User;
import codesquad.issuetracker.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;
    private final LabelRepository labelRepository;
    private final UserRepository userRepository;
    private final MilestoneRepository milestoneRepository;

    public Issue createIssue(Issue issue) {
        return issueRepository.save(issue);
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

    public Milestone getMilestoneForIssue(Issue issue) {
        return milestoneRepository.findById(issue.getMilestoneId()).get();
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

    public void deleteIssueById(Long issueId) {
        issueRepository.deleteById(issueId);
    }

    public void openIssuesById(List<Long> ids) {
        List<Issue> issues = (List<Issue>) issueRepository.findAllById(ids);
        issueRepository.saveAll(issues.stream()
                .peek(Issue::open)
                .collect(Collectors.toList()));
    }

    public void closeIssuesById(List<Long> ids) {
        List<Issue> issues = (List<Issue>) issueRepository.findAllById(ids);
        issueRepository.saveAll(issues.stream()
                .peek(Issue::close)
                .collect(Collectors.toList()));
    }

    public void addAssigneesById(Long issueId, List<String> userLoginIds) {
        Issue issue = issueRepository.findById(issueId).get();
        issue.addAssignee(userLoginIds);
        issueRepository.save(issue);
    }

    public void addLabelsById(Long issueId, List<Long> labelIds) {
        Issue issue = issueRepository.findById(issueId).get();
        issue.addLabel(labelIds);
        issueRepository.save(issue);
    }

    public void addMilestoneById(Long issueId, Long milestoneId) {
        Issue issue = issueRepository.findById(issueId).get();
        issue.addMilestone(milestoneId);
        issueRepository.save(issue);
    }

    public void deleteAssigneesById(Long issueId, List<String> userLoginIds) {
        Issue issue = issueRepository.findById(issueId).get();
        issue.deleteAssignee(userLoginIds);
        issueRepository.save(issue);
    }

    public void deleteLabelsById(Long issueId, List<Long> labelIds) {
        Issue issue = issueRepository.findById(issueId).get();
        issue.deleteLabel(labelIds);
        issueRepository.save(issue);
    }

    public void deleteMilestoneById(Long issueId) {
        Issue issue = issueRepository.findById(issueId).get();
        issue.deleteMilestone();
        issueRepository.save(issue);
    }
}
