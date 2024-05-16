package com.CodeSquad.IssueTracker.issues;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/issues")
public class IssuesController {

    private final IssueService issueService;
    private final static long DEFAULT_OFFSET = 15;


    public IssuesController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping
    public ResponseEntity<List<Issue>> getAllIssues() {
        List<Issue> issues = issueService.getAllIssues();
        return new ResponseEntity<>(issues, HttpStatus.OK);
    }

    @GetMapping("/open")
    public ResponseEntity<List<Issue>> getOpenIssues(@RequestParam(value = "page", defaultValue = "1") long page) {
        List<Issue> openIssues = issueService.findOpenIssues(page, DEFAULT_OFFSET);
        return ResponseEntity.ok(openIssues);
    }

    @GetMapping("/close")
    public ResponseEntity<List<Issue>> getCloseIssues(@RequestParam(value = "page", defaultValue = "1") long page) {
        List<Issue> openIssues = issueService.findCloseIssues(page, DEFAULT_OFFSET);
        return ResponseEntity.ok(openIssues);
    }
}
