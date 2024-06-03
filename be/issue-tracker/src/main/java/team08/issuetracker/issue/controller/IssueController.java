package team08.issuetracker.issue.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team08.issuetracker.issue.model.Issue;
import team08.issuetracker.issue.model.dto.IssueDeleteResponse;
import team08.issuetracker.issue.model.dto.IssueOverviewResponse;
import team08.issuetracker.issue.model.dto.IssueCreationRequest;
import team08.issuetracker.issue.model.dto.IssueCreationResponse;
import team08.issuetracker.issue.service.IssueService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/issue")
public class IssueController {
    private final IssueService issueService;

    @GetMapping()
    public ResponseEntity<IssueOverviewResponse> getAllIssuesWithCounts(@RequestParam(required = false, value = "state") String state) {
        IssueOverviewResponse issues = issueService.getAllIssuesWithCounts(state);
        return ResponseEntity.ok(issues);
    }

    @PostMapping()
    public ResponseEntity<IssueCreationResponse> createIssue(@RequestBody IssueCreationRequest issueCreationRequest) {

        Issue issue = issueService.createNewIssue(issueCreationRequest);

        IssueCreationResponse response = IssueCreationResponse.from(issue);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<IssueDeleteResponse> deleteIssue(@PathVariable long id) {
        issueService.deleteIssue(id);

        IssueDeleteResponse response = IssueDeleteResponse.from(id);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }
}
