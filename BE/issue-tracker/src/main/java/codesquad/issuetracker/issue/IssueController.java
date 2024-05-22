package codesquad.issuetracker.issue;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.comment.Comment;
import codesquad.issuetracker.comment.CommentCreateRequest;
import codesquad.issuetracker.comment.CommentService;
import codesquad.issuetracker.issue.dto.DetailIssueResponse;
import codesquad.issuetracker.issue.dto.IssueCreateRequest;
import java.net.URI;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/issues")
public class IssueController {

    IssueService issueService;
    CommentService commentService;

    public IssueController(IssueService issueService, CommentService commentService) {
        this.issueService = issueService;
        this.commentService = commentService;
    }

    @GetMapping
    public List<Issue> getIssues(@RequestParam State state) {
        return issueService.findIssuesByState(state);
    }

    @GetMapping("/{issueId}")
    public DetailIssueResponse getDetailIssue(@PathVariable Long issueId) {
        return issueService.findDetailIssueById(issueId);
    }

    @PostMapping
    public ResponseEntity<Issue> createIssue(@RequestBody IssueCreateRequest issueCreateRequest) {
        Issue savedIssue = issueService.create(issueCreateRequest);
        return ResponseEntity.created(URI.create("/api/issues/" + savedIssue.getId())).build();
    }

    @PostMapping("/{issueId}/comments")
    public Comment addComment(@PathVariable Long issueId, @RequestBody
    CommentCreateRequest commentCreateRequest) {
        return issueService.addComment(issueId, commentCreateRequest);
    }

    @PatchMapping("/{issueId}")
    public Issue updateIssue(@PathVariable Long issueId, @RequestBody String title) {
        return issueService.updateTitle(issueId, title);

    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<?> deleteIssue(@PathVariable Long issueId) {
        issueService.delete(issueId);
        return ResponseEntity.noContent().build();
    }
}
