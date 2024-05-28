package team08.issuetracker.filter.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team08.issuetracker.filter.model.dto.FilteredIssueRequest;
import team08.issuetracker.filter.model.dto.FilteredIssueResponse;
import team08.issuetracker.filter.service.FilterService;
import team08.issuetracker.issue.model.Issue;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/filter")
public class FilterController {

    private final FilterService filterService;


    @GetMapping
    ResponseEntity<?> getFilteredIssue(
            @RequestParam String target,
            @RequestParam(required = false) String is_open,
            @RequestParam(required = false) String writer,
            @RequestParam(required = false) String assignee,
            @RequestParam(required = false) String commenter
    ) {
        FilteredIssueRequest request = new FilteredIssueRequest(target, is_open, writer, assignee, commenter);

        FilteredIssueResponse response = filterService.getFilteredIssues(request);

        return ResponseEntity.ok(response);
    }

}
