package com.CodeSquad.IssueTracker.issues;

import com.CodeSquad.IssueTracker.issues.dto.IssueDetailResponse;
import com.CodeSquad.IssueTracker.issues.dto.IssueIdResponse;
import com.CodeSquad.IssueTracker.issues.dto.IssueRequest;;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class IssueController {
    private IssueService issueService;
    private final static long DEFAULT_OFFSET = 15;


    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping("/issues")
    public ResponseEntity<List<Issue>> getAllIssues() {
        List<Issue> issues = issueService.getAllIssues();
        return new ResponseEntity<>(issues, HttpStatus.OK);
    }

    @GetMapping("/issues/open")
    public ResponseEntity<List<Issue>> getOpenIssues(@RequestParam(value = "page", defaultValue = "1") long page) {
        List<Issue> openIssues = issueService.findOpenIssues(page, DEFAULT_OFFSET);
        return ResponseEntity.ok(openIssues);
    }

    @GetMapping("/issues/close")
    public ResponseEntity<List<Issue>> getCloseIssues(@RequestParam(value = "page", defaultValue = "1") long page) {
        List<Issue> openIssues = issueService.findCloseIssues(page, DEFAULT_OFFSET);
        return ResponseEntity.ok(openIssues);
    }

    @PostMapping("/issue")
    public ResponseEntity<IssueIdResponse> createIssue(@RequestBody IssueRequest issueRequest) {
        Long createdIssueId = issueService.createIssue(issueRequest);
        IssueIdResponse issueIdResponse = new IssueIdResponse(createdIssueId);
        return ResponseEntity.ok(issueIdResponse);
    }

    @GetMapping("/issue/{issueId}")
    public ResponseEntity<IssueDetailResponse> getIssue(@PathVariable("issueId") long issueId) {
        IssueDetailResponse issueDetailResponse = issueService.getIssueById(issueId);
        return new ResponseEntity<>(issueDetailResponse, HttpStatus.OK);
    }

    @PatchMapping("/issue/{issueId}/open")
    public ResponseEntity<Issue> openIssue(@PathVariable("issueId") long issueId) {
        issueService.openIssue(issueId);
        Issue issue = issueService.findIssueById(issueId);
        return new ResponseEntity<>(issue, HttpStatus.OK);
    }

    @PatchMapping("/issue/{issueId}/close")
    public ResponseEntity<Issue> closeIssue(@PathVariable("issueId") long issueId) {
        issueService.closeIssue(issueId);
        Issue issue = issueService.findIssueById(issueId);
        return new ResponseEntity<>(issue, HttpStatus.OK);
    }
    @PostMapping("/issue/{issueId}/labels/{labelId}")
    public ResponseEntity<Void> addLabelToIssue(@PathVariable Long issueId, @PathVariable Long labelId) {
        issueService.addLabelToIssue(issueId, labelId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/issue/{issueId}/labels/{labelId}")
    public ResponseEntity<Void> removeLabelFromIssue(@PathVariable Long issueId, @PathVariable Long labelId) {
        issueService.removeLabelFromIssue(issueId, labelId);
        return ResponseEntity.ok().build();
    }
}