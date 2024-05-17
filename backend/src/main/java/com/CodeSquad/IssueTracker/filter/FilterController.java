package com.CodeSquad.IssueTracker.filter;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FilterController {

    private final FilterService filterService;

    public FilterController(FilterService filterService) {
        this.filterService = filterService;
    }

    @GetMapping("/filters")
    public ResponseEntity<FilterResponse> getIssueNumber() {
        FilterResponse filterResponse = filterService.getFilterResponse();
        return new ResponseEntity<>(filterResponse, HttpStatus.OK);
    }
}
