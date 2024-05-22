package codesquad.issuetracker.issue;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.comment.Comment;
import codesquad.issuetracker.comment.CommentCreateRequest;
import codesquad.issuetracker.comment.CommentResponse;
import codesquad.issuetracker.issue.dto.DetailIssueResponse;
import codesquad.issuetracker.issue.dto.IssueCreateRequest;
import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.label.LabelService;
import codesquad.issuetracker.user.UserService;
import codesquad.issuetracker.user.dto.UserResponse;
import java.util.List;
import java.util.NoSuchElementException;
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

    @Autowired
    public IssueService(IssueRepository issueRepository, LabelService labelService,
        UserService userService) {
        this.issueRepository = issueRepository;
        this.labelService = labelService;
        this.userService = userService;
    }

    public List<Issue> findIssuesByState(State state) {
        return issueRepository.findAllByState(state);
    }

    public Issue create(IssueCreateRequest issueCreateRequest) {
        Issue issue = issueCreateRequest.toEntity();
        return issueRepository.save(issue);
    }

    public DetailIssueResponse findDetailIssueById(Long issueId) {
        Issue issue = findById(issueId);

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

        return DetailIssueResponse.of(issue, labels, assignees, comments);
    }

    public Issue findById(Long issueId) {
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        return optionalIssue.orElseThrow(NoSuchElementException::new);
    }

    public List<Issue> findByMilestoneId(Long milestoneId) {
        return issueRepository.findByMilestoneId(milestoneId);
    }

    public Issue updateTitle(Long issueId, String title) {
        Issue issue = findById(issueId);
        issue.updateTitle(title);
        issueRepository.save(issue);
        return issue;
    }

    public void delete(Long issueId) {
        Issue issue = findById(issueId);
        issue.delete();
        issueRepository.save(issue);
    }


    public Comment addComment(Long issueId, CommentCreateRequest commentCreateRequest) {
        Comment comment = Comment.of(commentCreateRequest);
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        Issue issue = optionalIssue.orElseThrow(NoSuchElementException::new);
        issue.addComment(comment);
        issueRepository.save(issue);
        return comment;
    }
}
