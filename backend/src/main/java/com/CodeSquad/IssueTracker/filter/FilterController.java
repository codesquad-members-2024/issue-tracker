package com.CodeSquad.IssueTracker.filter;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FilterController {

    private final FilterService filterService;

    public FilterController(FilterService filterService) {
        this.filterService = filterService;
    }

    @GetMapping("/filters")
    public ResponseEntity<IssueNumberResponse> getIssueNumber() {
        IssueNumberResponse issueNumberResponse = filterService.getIssueNumber();
        return new ResponseEntity<>(issueNumberResponse, HttpStatus.OK);
    }
}
