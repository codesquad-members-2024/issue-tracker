package team08.issuetracker.issue.controller;

import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team08.issuetracker.issue.model.Issue;
import team08.issuetracker.issue.model.dto.IssueDeleteResponse;
import team08.issuetracker.issue.model.dto.IssueOverviewResponse;
import team08.issuetracker.issue.model.dto.update.IssueAssigneeUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueContentUpdateRequest;
import team08.issuetracker.issue.model.dto.IssueCreationRequest;
import team08.issuetracker.issue.model.dto.IssueCreationResponse;
import team08.issuetracker.issue.model.dto.update.IssueLabelUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueMilestoneUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueStateMultipleUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueStateMultipleUpdateResponse;
import team08.issuetracker.issue.model.dto.update.IssueTitleUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueUpdateResponse;
import team08.issuetracker.issue.service.IssueService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/issue")
public class IssueController {
    private final IssueService issueService;

    @GetMapping()
    public ResponseEntity<IssueOverviewResponse> getAllIssuesWithCounts(@RequestParam(required = false, value = "state") String state) {
        IssueOverviewResponse issues = issueService.getAllIssuesWithCounts(state);
        return ResponseEntity.ok(issues);
    }

    @PostMapping()
    public ResponseEntity<IssueCreationResponse> createIssue(@RequestBody IssueCreationRequest issueCreationRequest) {

        Issue issue = issueService.createNewIssue(issueCreationRequest);

        IssueCreationResponse response = IssueCreationResponse.from(issue);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/title")
    public ResponseEntity<IssueUpdateResponse> updateIssueTitle(@PathVariable long id,
                                                                @RequestBody IssueTitleUpdateRequest issueTitleUpdateRequest) {
        Issue issue = issueService.updateIssueTitle(id, issueTitleUpdateRequest);

        IssueUpdateResponse response = IssueUpdateResponse.from(issue);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }


    @PatchMapping("/{id}/content")
    public ResponseEntity<IssueUpdateResponse> updateIssueContent(@PathVariable long id,
                                                                  @RequestBody IssueContentUpdateRequest issueContentUpdateRequest) {
        Issue issue = issueService.updateIssueContent(id, issueContentUpdateRequest);

        IssueUpdateResponse response = IssueUpdateResponse.from(issue);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/assignee")
    public ResponseEntity<IssueUpdateResponse> updateIssueAssignee(@PathVariable long id,
                                                                   @RequestBody IssueAssigneeUpdateRequest issueAssigneeUpdateRequest) {
        Issue issue = issueService.updateIssueAssignee(id, issueAssigneeUpdateRequest);

        IssueUpdateResponse response = IssueUpdateResponse.from(issue);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/label")
    public ResponseEntity<IssueUpdateResponse> updateIssueLabel(@PathVariable long id,
                                                                @RequestBody IssueLabelUpdateRequest issueLabelUpdateRequest) {
        Issue issue = issueService.updateIssueLabel(id, issueLabelUpdateRequest);

        IssueUpdateResponse response = IssueUpdateResponse.from(issue);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/milestone")
    public ResponseEntity<IssueUpdateResponse> updateIssueMilestone(@PathVariable long id,
                                                                    @RequestBody IssueMilestoneUpdateRequest issueMilestoneUpdateRequest) {
        Issue issue = issueService.updateIssueMilestone(id, issueMilestoneUpdateRequest);

        IssueUpdateResponse response = IssueUpdateResponse.from(issue);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }


    //todo 이미 닫혀있거나 열려있는 상태에 대한 예외던지기
    @PatchMapping("/{id}/open")
    public ResponseEntity<IssueUpdateResponse> openIssue(@PathVariable long id) {
        Issue issue = issueService.updateIssueStateToOpen(id);

        return ResponseEntity.ok(IssueUpdateResponse.from(issue));
    }

    @PatchMapping("/{id}/close")
    public ResponseEntity<IssueUpdateResponse> closeIssue(@PathVariable long id) {
        Issue issue = issueService.updateIssueStateToClose(id);

        return ResponseEntity.ok(IssueUpdateResponse.from(issue));
    }

    @PatchMapping("/all-open")
    public ResponseEntity<IssueStateMultipleUpdateResponse> openMultipleIssues(@RequestBody IssueStateMultipleUpdateRequest issueStateMultipleUpdateRequest) {
        Set<Long> issueIds = issueStateMultipleUpdateRequest.issueIds();

        Set<Long> updatedIds = issueService.updateMultipleIssueStateToOpen(issueIds);

        IssueStateMultipleUpdateResponse response = new IssueStateMultipleUpdateResponse(updatedIds);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/all-close")
    public ResponseEntity<IssueStateMultipleUpdateResponse> closeMultipleIssues(@RequestBody IssueStateMultipleUpdateRequest issueStateMultipleUpdateRequest) {
        Set<Long> issueIds = issueStateMultipleUpdateRequest.issueIds();

        Set<Long> updatedIds = issueService.updateMultipleIssueStateToClose(issueIds);

        IssueStateMultipleUpdateResponse response = new IssueStateMultipleUpdateResponse(updatedIds);


        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<IssueDeleteResponse> deleteIssue(@PathVariable long id) {
        issueService.deleteIssue(id);

        IssueDeleteResponse response = IssueDeleteResponse.from(id);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }
}
