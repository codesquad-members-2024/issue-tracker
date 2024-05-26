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
import team08.issuetracker.issue.model.dto.IssueResponse;
import team08.issuetracker.issue.model.dto.IssueTitleUpdateRequest;
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
    public ResponseEntity<List<IssueResponse>> issues() {
        List<IssueResponse> issues = issueService.getIssueListResponse();
        return ResponseEntity.ok(issues);
    }

    @PostMapping()
    public ResponseEntity<IssueCreationResponse> createIssue(@RequestBody IssueCreationRequest issueCreationRequest) {

        Issue issue = issueService.createNewIssue(issueCreationRequest);

        return ResponseEntity.status(HttpStatus.FOUND)
                .body(IssueCreationResponse.from(issue));
    }

    @PatchMapping("/{id}/title")
    public ResponseEntity<IssueUpdateResponse> updateIssueTitle(@PathVariable long id, @RequestBody IssueTitleUpdateRequest issueTitleUpdateRequest) {
        Issue issue = issueService.updateIssueTitle(id, issueTitleUpdateRequest);

        IssueUpdateResponse response = IssueUpdateResponse.from(issue);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
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
