package com.CodeSquad.IssueTracker.issues;

import com.CodeSquad.IssueTracker.issues.dto.*;
import com.CodeSquad.IssueTracker.milestone.Milestone;
import com.CodeSquad.IssueTracker.milestone.MilestoneService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/issue")
public class IssueController {

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
        return ResponseEntity.ok(issueDetailResponse);
    }

    @PatchMapping("/{issueId}/open")
    public ResponseEntity<Issue> openIssue(@PathVariable("issueId") long issueId) {
        issueService.openIssue(issueId);
        Issue issue = issueService.findIssueById(issueId);
        return ResponseEntity.ok(issue);
    }

    @PatchMapping("/{issueId}/close")
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
    @PostMapping("/{issueId}/labels/{labelId}")
    public ResponseEntity<Void> addLabelToIssue(@PathVariable Long issueId, @PathVariable Long labelId) {
        issueService.addLabelToIssue(issueId, labelId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{issueId}/labels/{labelId}")
    public ResponseEntity<Void> removeLabelFromIssue(@PathVariable Long issueId, @PathVariable Long labelId) {
        issueService.removeLabelFromIssue(issueId, labelId);
        return ResponseEntity.ok().build();
    }

}