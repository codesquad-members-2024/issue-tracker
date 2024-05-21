package codesquad.issuetracker.issue;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @PostMapping("/issues")
    public ResponseEntity<Issue> createIssue(@RequestBody Issue issue, UriComponentsBuilder uriComponentsBuilder) {
        Issue createdIssue = issueService.createIssue(issue);
        URI location = uriComponentsBuilder.path("/issues/{id}")
                .buildAndExpand(createdIssue.getId())
                .toUri();
        return ResponseEntity
                .created(location)
                .body(createdIssue);
    }

    @GetMapping("/issues")
    public ResponseEntity<List<IssueShowDto>> getAllIssues() {
        List<Issue> allIssues = issueService.getAllIssues();
        return ResponseEntity
                .ok(allIssues.stream()
                        .map(issue -> new IssueShowDto(
                                issue,
                                issueService.getLabelsForIssue(issue),
                                issueService.getAssigneesForIssue(issue),
                                issueService.getMilestoneForIssue(issue)))
                        .collect(Collectors.toList()));
    }

    @GetMapping("/issues/{issueId}")
    public ResponseEntity<IssueShowDto> issueDetail(@PathVariable Long issueId) {
        Issue issue = issueService.getIssue(issueId);
        return ResponseEntity
                .ok(new IssueShowDto(issue,
                        issueService.getLabelsForIssue(issue),
                        issueService.getAssigneesForIssue(issue),
                        issueService.getMilestoneForIssue(issue)));
    }

    @PutMapping("/issues/{issueId}/title")
    public ResponseEntity<Void> updateIssueTitleById(@PathVariable Long issueId, @RequestBody IssueTitleUpdateDto issueTitleUpdateDto) {
        issueService.updateIssueTitleById(issueId, issueTitleUpdateDto.getTitle());
        return ResponseEntity
                .noContent()
                .build();
    }

    @PutMapping("/issues/{issueId}/content")
    public ResponseEntity<Void> updateIssueContentById(@PathVariable Long issueId, @RequestBody IssueContentUpdateDto issueContentUpdateDto) {
        issueService.updateIssueContentById(issueId, issueContentUpdateDto.getContent());
        return ResponseEntity
                .noContent()
                .build();
    }

    @DeleteMapping("/issues/{issueId}")
    public ResponseEntity<Void> deleteIssueById(@PathVariable Long issueId) {
        issueService.deleteIssueById(issueId);
        return ResponseEntity
                .noContent()
                .build();
    }

    @PutMapping("/issues/open")
    public ResponseEntity<Void> openIssuesById(@RequestBody List<Long> issueIds) {
        issueService.openIssuesById(issueIds);
        return ResponseEntity
                .noContent()
                .build();
    }

    @PutMapping("/issues/close")
    public ResponseEntity<Void> closeIssuesById(@RequestBody List<Long> issueIds) {
        issueService.closeIssuesById(issueIds);
        return ResponseEntity
                .noContent()
                .build();
    }

    @PutMapping("/issues/{issueId}/assignee")
    public ResponseEntity<Void> addAssigneesById(@PathVariable Long issueId, @RequestBody List<String> userLoginIds) {
        issueService.addAssigneesById(issueId, userLoginIds);
        return ResponseEntity
                .noContent()
                .build();
    }

    @PutMapping("/issues/{issueId}/label")
    public ResponseEntity<Void> addLabelsById(@PathVariable Long issueId, @RequestBody List<Long> labelIds) {
        issueService.addLabelsById(issueId, labelIds);
        return ResponseEntity
                .noContent()
                .build();
    }

    @PutMapping("/issues/{issueId}/milestone")
    public ResponseEntity<Void> addMilestoneById(@PathVariable Long issueId, @RequestBody Long milestoneId) {
        issueService.addMilestoneById(issueId, milestoneId);
        return ResponseEntity
                .noContent()
                .build();
    }
}