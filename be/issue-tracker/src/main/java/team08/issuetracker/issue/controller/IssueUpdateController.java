package team08.issuetracker.issue.controller;

import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team08.issuetracker.issue.model.Issue;
import team08.issuetracker.issue.model.dto.update.IssueAssigneeUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueContentUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueLabelUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueMilestoneUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueStateMultipleUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueStateMultipleUpdateResponse;
import team08.issuetracker.issue.model.dto.update.IssueTitleUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueUpdateResponse;
import team08.issuetracker.issue.service.IssueUpdateService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/issue")
public class IssueUpdateController {

    private final IssueUpdateService issueUpdateService;

    @PatchMapping("/{id}/title")
    public ResponseEntity<IssueUpdateResponse> updateIssueTitle(@PathVariable long id,
                                                                @RequestBody IssueTitleUpdateRequest issueTitleUpdateRequest) {
        Issue issue = issueUpdateService.updateIssueTitle(id, issueTitleUpdateRequest);

        IssueUpdateResponse response = IssueUpdateResponse.from(issue);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }


    @PatchMapping("/{id}/content")
    public ResponseEntity<IssueUpdateResponse> updateIssueContent(@PathVariable long id,
                                                                  @RequestBody IssueContentUpdateRequest issueContentUpdateRequest) {
        Issue issue = issueUpdateService.updateIssueContent(id, issueContentUpdateRequest);

        IssueUpdateResponse response = IssueUpdateResponse.from(issue);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/assignee")
    public ResponseEntity<IssueUpdateResponse> updateIssueAssignee(@PathVariable long id,
                                                                   @RequestBody IssueAssigneeUpdateRequest issueAssigneeUpdateRequest) {
        Issue issue = issueUpdateService.updateIssueAssignee(id, issueAssigneeUpdateRequest);

        IssueUpdateResponse response = IssueUpdateResponse.from(issue);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/label")
    public ResponseEntity<IssueUpdateResponse> updateIssueLabel(@PathVariable long id,
                                                                @RequestBody IssueLabelUpdateRequest issueLabelUpdateRequest) {
        Issue issue = issueUpdateService.updateIssueLabel(id, issueLabelUpdateRequest);

        IssueUpdateResponse response = IssueUpdateResponse.from(issue);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/milestone")
    public ResponseEntity<IssueUpdateResponse> updateIssueMilestone(@PathVariable long id,
                                                                    @RequestBody IssueMilestoneUpdateRequest issueMilestoneUpdateRequest) {
        Issue issue = issueUpdateService.updateIssueMilestone(id, issueMilestoneUpdateRequest);

        IssueUpdateResponse response = IssueUpdateResponse.from(issue);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }


    @PatchMapping("/{id}/open")
    public ResponseEntity<IssueUpdateResponse> openIssue(@PathVariable long id) {
        Issue issue = issueUpdateService.updateIssueStateToOpen(id);

        return ResponseEntity.ok(IssueUpdateResponse.from(issue));
    }

    @PatchMapping("/{id}/close")
    public ResponseEntity<IssueUpdateResponse> closeIssue(@PathVariable long id) {
        Issue issue = issueUpdateService.updateIssueStateToClose(id);

        return ResponseEntity.ok(IssueUpdateResponse.from(issue));
    }

    @PatchMapping("/all-open")
    public ResponseEntity<IssueStateMultipleUpdateResponse> openMultipleIssues(
            @RequestBody IssueStateMultipleUpdateRequest issueStateMultipleUpdateRequest) {
        Set<Long> issueIds = issueStateMultipleUpdateRequest.issueIds();

        Set<Long> updatedIds = issueUpdateService.updateMultipleIssueStateToOpen(issueIds);

        IssueStateMultipleUpdateResponse response = new IssueStateMultipleUpdateResponse(updatedIds);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/all-close")
    public ResponseEntity<IssueStateMultipleUpdateResponse> closeMultipleIssues(
            @RequestBody IssueStateMultipleUpdateRequest issueStateMultipleUpdateRequest) {
        Set<Long> issueIds = issueStateMultipleUpdateRequest.issueIds();

        Set<Long> updatedIds = issueUpdateService.updateMultipleIssueStateToClose(issueIds);

        IssueStateMultipleUpdateResponse response = new IssueStateMultipleUpdateResponse(updatedIds);

        return ResponseEntity.ok(response);
    }
}
