package codesquad.issuetracker.controller;

import codesquad.issuetracker.domain.Issue;
import codesquad.issuetracker.service.IssueService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@CrossOrigin(origins = "*")
@Controller
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @ResponseBody
    @GetMapping("/issues")
    public List<Issue> getAllIssues() {
        return issueService.getAllIssues();
    }
}
