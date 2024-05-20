package com.CodeSquad.IssueTracker.issues;

import com.CodeSquad.IssueTracker.issues.dto.IssueDetailResponse;
import com.CodeSquad.IssueTracker.issues.dto.IssueIdResponse;
import com.CodeSquad.IssueTracker.issues.dto.IssueRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/issue")
public class IssueController {

    private final static long DEFAULT_OFFSET = 15;
    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @PostMapping
    public ResponseEntity<IssueIdResponse> createIssue(@RequestBody IssueRequest issueRequest) {
        Long createdIssueId = issueService.createIssue(issueRequest);
        IssueIdResponse issueIdResponse = new IssueIdResponse(createdIssueId);
        return ResponseEntity.ok(issueIdResponse);
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<IssueDetailResponse> getIssue(@PathVariable("issueId") long issueId) {
        IssueDetailResponse issueDetailResponse = issueService.getIssueById(issueId);
        return new ResponseEntity<>(issueDetailResponse, HttpStatus.OK);
    }

    @PatchMapping("/{issueId}/open")
    public ResponseEntity<Issue> openIssue(@PathVariable("issueId") long issueId) {
        issueService.openIssue(issueId);
        Issue issue = issueService.findIssueById(issueId);
        return new ResponseEntity<>(issue, HttpStatus.OK);
    }

    @PatchMapping("/{issueId}/close")
    public ResponseEntity<Issue> closeIssue(@PathVariable("issueId") long issueId) {
        issueService.closeIssue(issueId);
        Issue issue = issueService.findIssueById(issueId);
        return new ResponseEntity<>(issue, HttpStatus.OK);
    }
}