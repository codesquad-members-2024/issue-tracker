package team08.issuetracker.issue.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import team08.issuetracker.issue.model.Issue;
import team08.issuetracker.issue.model.dto.IssueCreationRequest;
import team08.issuetracker.issue.model.dto.IssueListResponse;
import team08.issuetracker.issue.service.IssueService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class IssueController {
    private final IssueService issueService;

    @GetMapping("/issue")
    public ResponseEntity<IssueListResponse> issues() {
        List<Issue> issues = issueService.issues();
        IssueListResponse issueListResponse = new IssueListResponse(issues);
        return ResponseEntity.ok(issueListResponse);
    }

    @PostMapping("/issue")
    public ResponseEntity<String> createIssue(@RequestBody IssueCreationRequest issueCreationRequest) {

        issueService.createNewIssue(issueCreationRequest);

        return ResponseEntity.ok("이슈 생성 성공");
    }
}
