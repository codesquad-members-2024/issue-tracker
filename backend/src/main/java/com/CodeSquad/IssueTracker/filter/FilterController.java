package com.CodeSquad.IssueTracker.filter;

import com.CodeSquad.IssueTracker.filter.dto.FilterListResponse;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<FilterListResponse> getIssueNumber() {
        FilterListResponse filterListResponse = filterService.getFilterListResponse();
        return new ResponseEntity<>(filterListResponse, HttpStatus.OK);
    }
}
