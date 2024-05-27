package team08.issuetracker.milestone.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team08.issuetracker.issue.service.IssueCountService;
import team08.issuetracker.issue.service.IssueService;
import team08.issuetracker.milestone.model.Milestone;
import team08.issuetracker.milestone.model.dto.MilestoneCreationRequest;
import team08.issuetracker.milestone.model.dto.MilestoneCreationResponse;
import team08.issuetracker.milestone.model.dto.MilestoneDeleteResponse;
import team08.issuetracker.milestone.model.dto.MilestoneOverviewResponse;
import team08.issuetracker.milestone.model.dto.MilestoneUpdateRequest;
import team08.issuetracker.milestone.model.dto.MilestoneUpdateResponse;
import team08.issuetracker.milestone.service.MilestoneService;

@RestController
@Slf4j
@RequestMapping("/milestone")
@RequiredArgsConstructor
public class MilestoneController {
    private final MilestoneService milestoneService;

    @GetMapping()
    public ResponseEntity<?> getAllMilestonesWithCounts(@RequestParam(required = false, value = "state") String state) {
        MilestoneOverviewResponse milestoneOverviewResponse = milestoneService.getAllMilestonesWithCounts(state);

        return ResponseEntity.ok(milestoneOverviewResponse);
    }

    @PostMapping()
    public ResponseEntity<MilestoneCreationResponse> saveMilestone(@RequestBody MilestoneCreationRequest milestoneCreationRequest) {
        Milestone milestone = milestoneService.saveMilestone(milestoneCreationRequest);

        MilestoneCreationResponse response = MilestoneCreationResponse.from(milestone);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("{id}")
    public ResponseEntity<MilestoneUpdateResponse> updateMilestone(@PathVariable long id, @RequestBody MilestoneUpdateRequest milestoneUpdateRequest) {
        Milestone milestone = milestoneService.updateMilestone(id, milestoneUpdateRequest);

        MilestoneUpdateResponse response = MilestoneUpdateResponse.from(milestone);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("{id}/open")
    public ResponseEntity<MilestoneUpdateResponse> openMilestone(@PathVariable long id) {
        Milestone milestone = milestoneService.updateMilestoneStateToOpen(id);

        MilestoneUpdateResponse response = MilestoneUpdateResponse.from(milestone);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("{id}/close")
    public ResponseEntity<MilestoneUpdateResponse> closeMilestone(@PathVariable long id) {
        Milestone milestone = milestoneService.updateMilestoneStateToClose(id);

        MilestoneUpdateResponse response = MilestoneUpdateResponse.from(milestone);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<MilestoneDeleteResponse> deleteMilestone(@PathVariable long id) {
        milestoneService.deleteMilestone(id);

        MilestoneDeleteResponse response = MilestoneDeleteResponse.from(id);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }
}
