package team08.issuetracker.issue.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team08.issuetracker.issue.model.Issue;
import team08.issuetracker.issue.model.dto.IssueCreationRequest;
import team08.issuetracker.issue.model.dto.IssueCreationResponse;
import team08.issuetracker.issue.model.dto.IssueListResponse;
import team08.issuetracker.issue.model.dto.IssueUpdateResponse;
import team08.issuetracker.issue.service.IssueService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/issue")
@CrossOrigin("*")
public class IssueController {
    private final IssueService issueService;

    @GetMapping()
    public ResponseEntity<IssueListResponse> issues() {
        List<Issue> issues = issueService.issues();
        IssueListResponse issueListResponse = new IssueListResponse(issues);
        return ResponseEntity.ok(issueListResponse);
    }

    @PostMapping()
    public ResponseEntity<IssueCreationResponse> createIssue(@RequestBody IssueCreationRequest issueCreationRequest) {

        Issue issue = issueService.createNewIssue(issueCreationRequest);

        return ResponseEntity.status(HttpStatus.FOUND)
                .body(IssueCreationResponse.from(issue));
    }

    @PatchMapping("/{id}/open")
    public ResponseEntity<IssueUpdateResponse> openIssue(@PathVariable long id) {
        Issue issue = issueService.updateIssueStateToOpen(id);

        return ResponseEntity.ok(IssueUpdateResponse.from(issue));
    }

    @PatchMapping("/{id}/close")
    public ResponseEntity<IssueUpdateResponse> closeIssue(@PathVariable long id) {
        Issue issue = issueService.updateIssueStateToClose(id);

        return ResponseEntity.ok(IssueUpdateResponse.from(issue));
    }
}
