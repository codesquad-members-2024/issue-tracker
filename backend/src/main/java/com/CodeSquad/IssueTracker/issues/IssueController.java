package com.CodeSquad.IssueTracker.issues;

import com.CodeSquad.IssueTracker.issues.dto.*;
import com.CodeSquad.IssueTracker.milestone.Milestone;
import com.CodeSquad.IssueTracker.milestone.MilestoneService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class IssueController {
    private final IssueService issueService;

    private final static long DEFAULT_OFFSET = 15;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping("/issues")
    public ResponseEntity<List<Issue>> getAllIssues() {
        List<Issue> issues = issueService.getAllIssues();
        return ResponseEntity.ok(issues);
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
        return ResponseEntity.ok(issueDetailResponse);
    }

    @PatchMapping("/issue/{issueId}/open")
    public ResponseEntity<Issue> openIssue(@PathVariable("issueId") long issueId) {
        issueService.openIssue(issueId);
        Issue issue = issueService.findIssueById(issueId);
        return ResponseEntity.ok(issue);
    }

    @PatchMapping("/issue/{issueId}/close")
    public ResponseEntity<Issue> closeIssue(@PathVariable("issueId") long issueId) {
        issueService.closeIssue(issueId);
        Issue issue = issueService.findIssueById(issueId);
        return ResponseEntity.ok(issue);
    }

    @PatchMapping("/issue/{issueId}/title")
    public ResponseEntity<?> editIssueTitle(@PathVariable("issueId") long issueId, @RequestBody IssueTitleRequest issueTitleRequest) {
        issueService.updateIssueTitle(issueId, issueTitleRequest);
        return ResponseEntity.ok().build();
    }

    @PatchMapping ("/issue/{issueId}/milestone")
    public ResponseEntity<Milestone> editIssueMilestone(@PathVariable Long issueId, @RequestBody(required = false) IssueMilestoneRequest issueMilestoneRequest) {
        Milestone milestone = issueService.updateMilestoneIdForIssue(issueId,issueMilestoneRequest);
        return ResponseEntity.ok(milestone);
    }
}