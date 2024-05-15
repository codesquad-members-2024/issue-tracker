package codesquad.issuetracker.issue;

import codesquad.issuetracker.issue.dto.DetailIssueResponse;
import codesquad.issuetracker.issue.dto.IssueCreateRequest;
import java.net.URI;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping
    public List<Issue> getIssues(@RequestParam boolean isOpen) {
        return issueService.findIssuesByIsOpen(isOpen);
    }

    @GetMapping("/{issueId}")
    public DetailIssueResponse getDetailIssue(@PathVariable Long issueId) {
        Issue issue = issueService.findIssueById(issueId);
        return DetailIssueResponse.of(issue);
    }
}
