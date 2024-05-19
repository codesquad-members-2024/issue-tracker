package codesquad.issuetracker.issue;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @PostMapping("/issues")
    public void createIssue(@RequestBody Issue issue) {
        issueService.createIssue(issue);
    }

    @GetMapping("/issues")
    public List<IssueShowDto> getAllIssues() {
        List<Issue> allIssues = issueService.getAllIssues();
        return allIssues.stream()
                .map(issue -> new IssueShowDto(
                        issue,
                        issueService.getLabelsForIssue(issue),
                        issueService.getAssigneesForIssue(issue)))
                .collect(Collectors.toList());
    }

    @GetMapping("/issues/{issueId}")
    public IssueShowDto issueDetail(@PathVariable Long issueId) {
        Issue issue = issueService.getIssue(issueId);
        return new IssueShowDto(issue,
                issueService.getLabelsForIssue(issue),
                issueService.getAssigneesForIssue(issue));
    }

    @PutMapping("/issues/{issueId}/title")
    public ResponseEntity<Void> updateIssueTitleById(@PathVariable Long issueId, @RequestBody IssueTitleUpdateDto issueTitleUpdateDto) {
        issueService.updateIssueTitleById(issueId, issueTitleUpdateDto.getTitle());
        return ResponseEntity
                .noContent()
                .build();
    }
}