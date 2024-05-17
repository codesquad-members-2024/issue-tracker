package codesquad.issuetracker.issue;

import codesquad.issuetracker.comment.CommentResponse;
import codesquad.issuetracker.issue.dto.DetailIssueResponse;
import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.label.LabelService;
import codesquad.issuetracker.milestone.MilestoneService;
import codesquad.issuetracker.user.UserService;
import codesquad.issuetracker.user.dto.UserResponse;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IssueService {

    private final IssueRepository issueRepository;
    private final LabelService labelService;
    private final UserService userService;
    private final MilestoneService milestoneService;

    @Autowired
    public IssueService(IssueRepository issueRepository, LabelService labelService,
        UserService userService, MilestoneService milestoneService) {
        this.issueRepository = issueRepository;
        this.labelService = labelService;
        this.userService = userService;
        this.milestoneService = milestoneService;
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

    public DetailIssueResponse findDetailIssueById(Long issueId) {
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        Issue issue = optionalIssue.orElseThrow(IllegalArgumentException::new);

        Set<Label> labels = issue.getLabelRefs().stream()
            .map(labelRef -> labelService.findById(labelRef.getLabelId()))
            .collect(Collectors.toSet());

        Set<UserResponse> assignees = issue.getAssigneeIds().stream()
            .map(assignee -> userService.findById(assignee.getAssigneeId()))
            .map(UserResponse::of)
            .collect(Collectors.toSet());

        List<CommentResponse> comments = issue.getComments().stream()
            .map(CommentResponse::of)
            .toList();

        return DetailIssueResponse.from(issue, labels, assignees, comments);
    }

    public List<Issue> findByMilestoneId(Long milestoneId) {
        return issueRepository.findByMilestoneId(milestoneId);
    }
}
