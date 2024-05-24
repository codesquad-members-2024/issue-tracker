package codesquad.issuetracker.issue;

import codesquad.issuetracker.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @PostMapping("/issues")
    public ResponseEntity<Issue> createIssue(
            @RequestBody Issue issue,
            UriComponentsBuilder uriComponentsBuilder,
            @SessionAttribute(name = "LOGIN USER", required = false) User user
    ) {
        issue.setWriter(user.getLoginId());
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
    public ResponseEntity<Issue> updateIssueTitleById(@PathVariable Long issueId, @RequestBody IssueTitleUpdateDto issueTitleUpdateDto) {
        Issue updatedIssue = issueService.updateIssueTitleById(issueId, issueTitleUpdateDto.getTitle());
        return ResponseEntity.ok(updatedIssue);
    }

    @PutMapping("/issues/{issueId}/content")
    public ResponseEntity<Issue> updateIssueContentById(@PathVariable Long issueId, @RequestBody IssueContentUpdateDto issueContentUpdateDto) {
        Issue updatedIssue = issueService.updateIssueContentById(issueId, issueContentUpdateDto.getContent());
        return ResponseEntity.ok(updatedIssue);
    }

    @DeleteMapping("/issues/{issueId}")
    public ResponseEntity<Void> deleteIssueById(@PathVariable Long issueId) {
        issueService.deleteIssueById(issueId);
        return ResponseEntity
                .noContent()
                .build();
    }

    @PutMapping("/issues/open")
    public ResponseEntity<List<Issue>> openIssuesById(@RequestBody List<Long> issueIds) {
        List<Issue> openedIssues = issueService.openIssuesById(issueIds);
        return ResponseEntity.ok(openedIssues);
    }

    @PutMapping("/issues/close")
    public ResponseEntity<List<Issue>> closeIssuesById(@RequestBody List<Long> issueIds) {
        List<Issue> closedIssues = issueService.closeIssuesById(issueIds);
        return ResponseEntity.ok(closedIssues);
    }

    @PutMapping("/issues/{issueId}/assignee")
    public ResponseEntity<Issue> addAssigneesById(@PathVariable Long issueId, @RequestBody List<String> userLoginIds) {
        Issue updatedIssue = issueService.addAssigneesById(issueId, userLoginIds);
        return ResponseEntity.ok(updatedIssue);
    }

    @PutMapping("/issues/{issueId}/label")
    public ResponseEntity<Issue> addLabelsById(@PathVariable Long issueId, @RequestBody List<Long> labelIds) {
        Issue updatedIssue = issueService.addLabelsById(issueId, labelIds);
        return ResponseEntity.ok(updatedIssue);
    }

    @PutMapping("/issues/{issueId}/milestone")
    public ResponseEntity<Issue> addMilestoneById(@PathVariable Long issueId, @RequestBody Long milestoneId) {
        Issue updatedIssue = issueService.addMilestoneById(issueId, milestoneId);
        return ResponseEntity.ok(updatedIssue);
    }

    @DeleteMapping("/issues/{issueId}/assignee")
    public ResponseEntity<Void> deleteAssigneesById(@PathVariable Long issueId, @RequestBody List<String> userLoginIds) {
        issueService.deleteAssigneesById(issueId, userLoginIds);
        return ResponseEntity
                .noContent()
                .build();
    }

    @DeleteMapping("/issues/{issueId}/label")
    public ResponseEntity<Void> deleteLabelsById(@PathVariable Long issueId, @RequestBody List<Long> labelIds) {
        issueService.deleteLabelsById(issueId, labelIds);
        return ResponseEntity
                .noContent()
                .build();
    }

    @DeleteMapping("/issues/{issueId}/milestone")
    public ResponseEntity<Void> deleteMilestoneById(@PathVariable Long issueId) {
        issueService.deleteMilestoneById(issueId);
        return ResponseEntity
                .noContent()
                .build();
    }

    @GetMapping("/issues/filter")
    public ResponseEntity<List<IssueShowDto>> filter(@ModelAttribute IssueQueryParamsDto queryParams) {
        List<Issue> filteredIssues = issueService.getFilteredIssues(
                queryParams.getAssigneeIds(),
                queryParams.getLabelIds(),
                queryParams.getMilestoneId(),
                queryParams.getWriter()
        );
        return ResponseEntity
                .ok(filteredIssues.stream()
                        .map(issue -> new IssueShowDto(
                                issue,
                                issueService.getLabelsForIssue(issue),
                                issueService.getAssigneesForIssue(issue),
                                issueService.getMilestoneForIssue(issue)))
                        .collect(Collectors.toList()));
    }
}