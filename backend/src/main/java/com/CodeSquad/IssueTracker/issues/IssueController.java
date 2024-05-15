package com.CodeSquad.IssueTracker.issues;

import com.CodeSquad.IssueTracker.issues.dto.IssueRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
public class IssueController {
    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping("/issues")
    public ResponseEntity<List<Issue>> getAllIssues() {
        List<Issue> issues = issueService.getAllIssues();
        return new ResponseEntity<>(issues, HttpStatus.OK);
    }

    @PostMapping("/issue")
    public ResponseEntity<Map<String, Long>> createIssue(@RequestBody IssueRequest issueRequest) {
        Long createdIssueId = issueService.createIssue(issueRequest);
        Map<String, Long> response = Map.of("issueId", createdIssueId);
        return ResponseEntity.ok(response);
    }
}