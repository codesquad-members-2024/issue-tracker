package codesquad.issuetracker.controller;

import codesquad.issuetracker.domain.Issue;
import codesquad.issuetracker.service.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @GetMapping("/issues")
    public List<Issue> getAllIssues() {
        return issueService.getAllIssues();
    }
}
