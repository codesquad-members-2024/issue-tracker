package codesquad.issuetracker.issue;

import codesquad.issuetracker.exception.IssueNotFoundException;
import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.label.LabelRepository;
import codesquad.issuetracker.milestone.Milestone;
import codesquad.issuetracker.milestone.MilestoneRepository;
import codesquad.issuetracker.user.User;
import codesquad.issuetracker.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        return issueRepository.findAll();
    }

    public List<Label> getLabelsForIssue(Issue issue) {
        List<Long> labelIds = issue.getIssueLabels().stream()
                .map(IssueLabel::getLabelId)
                .toList();
        return labelRepository.findAllById(labelIds);
    }

    public List<User> getAssigneesForIssue(Issue issue) {
        List<String> assigneeNames = issue.getIssueAssignees().stream()
                .map(IssueAssignee::getUserLoginId)
                .toList();
        return userRepository.findAllById(assigneeNames);
    }

    public Optional<Milestone> getMilestoneForIssue(Issue issue) {
        if (issue.getMilestoneId() == null) {
            return Optional.empty();
        }
        return milestoneRepository.findById(issue.getMilestoneId());
    }

    public Issue getIssue(Long issueId) {
        return getIssueById(issueId);
    }

    public Issue updateIssueTitleById(Long issueId, String newTitle) {
        issueRepository.updateTitleById(issueId, newTitle);
        return getIssueById(issueId);
    }

    public Issue updateIssueContentById(Long issueId, String newContent) {
        issueRepository.updateContentById(issueId, newContent);
        return getIssueById(issueId);
    }

    public void deleteIssueById(Long issueId) {
        issueRepository.deleteById(issueId);
    }

    public List<Issue> openIssuesById(List<Long> ids) {
        List<Issue> issues = issueRepository.findAllById(ids);
        issues.forEach(Issue::open);
        return (List<Issue>) issueRepository.saveAll(issues);
    }

    public List<Issue> closeIssuesById(List<Long> ids) {
        List<Issue> issues = issueRepository.findAllById(ids);
        issues.forEach(Issue::close);
        return (List<Issue>) issueRepository.saveAll(issues);
    }

    public Issue addAssigneesById(Long issueId, List<String> userLoginIds) {
        Issue issue = getIssueById(issueId);
        issue.addAssignee(userLoginIds);
        return issueRepository.save(issue);
    }

    public Issue addLabelsById(Long issueId, List<Long> labelIds) {
        Issue issue = getIssueById(issueId);
        issue.addLabel(labelIds);
        return issueRepository.save(issue);
    }

    public Issue addMilestoneById(Long issueId, Long milestoneId) {
        Issue issue = getIssueById(issueId);
        issue.addMilestone(milestoneId);
        return issueRepository.save(issue);
    }

    public void deleteAssigneesById(Long issueId, List<String> userLoginIds) {
        Issue issue = getIssueById(issueId);
        issue.deleteAssignee(userLoginIds);
        issueRepository.save(issue);
    }

    public void deleteLabelsById(Long issueId, List<Long> labelIds) {
        Issue issue = getIssueById(issueId);
        issue.deleteLabel(labelIds);
        issueRepository.save(issue);
    }

    public void deleteMilestoneById(Long issueId) {
        Issue issue = getIssueById(issueId);
        issue.deleteMilestone();
        issueRepository.save(issue);
    }

    public List<Issue> getFilteredIssues(IssueFilterDto issueFilterDto) {
        List<Long> filteredIssueIds = issueRepository.findIssuesByFilter(issueFilterDto);
        return issueRepository.findAllById(filteredIssueIds);
    }

    private Issue getIssueById(Long issueId) {
        return issueRepository.findById(issueId).orElseThrow(() -> new IssueNotFoundException("존재하지 않는 이슈입니다."));
    }
}