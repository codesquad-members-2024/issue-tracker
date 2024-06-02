package com.issuetracker.domain.milestone;

import com.issuetracker.domain.milestone.argumentresolver.MilestoneId;
import com.issuetracker.domain.milestone.request.MilestoneCreateRequest;
import com.issuetracker.domain.milestone.request.MilestoneUpdateRequest;
import com.issuetracker.domain.milestone.response.MilestoneListResponse;
import com.issuetracker.domain.milestone.response.MilestoneResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/milestones")
@RequiredArgsConstructor
public class MilestoneController {

    private final MilestoneService milestoneService;

    @GetMapping
    public ResponseEntity<MilestoneListResponse> getMilestones() {
        return ResponseEntity
                .ok(milestoneService.getMilestones());
    }

    @GetMapping(params = "isOpen")
    public ResponseEntity<MilestoneListResponse> getMilestonesByOpenCondition(
            @RequestParam(value = "isOpen", defaultValue = "true") boolean openStatus) {
        return ResponseEntity
                .ok(milestoneService.getMilestonesByOpenCondition(openStatus));
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@Valid @RequestBody MilestoneCreateRequest request) {
        return ResponseEntity
                .ok(Collections.singletonMap("milestoneId", milestoneService.create(request)));
    }

    @DeleteMapping("/{milestoneId}")
    public ResponseEntity<Void> delete(@PathVariable("milestoneId") @MilestoneId String milestoneId) {
        milestoneService.delete(milestoneId);
        return ResponseEntity
                .ok()
                .build();
    }

    @PutMapping("/{milestoneId}")
    public ResponseEntity<MilestoneResponse> edit(@PathVariable("milestoneId") @MilestoneId String milestoneId,
                                     @Valid @RequestBody MilestoneUpdateRequest request) {
        milestoneService.edit(milestoneId, request);
        return ResponseEntity
                .ok()
                .build();
    }

    @GetMapping("/count")
    public ResponseEntity<?> getMilestoneCount() {
        return ResponseEntity
                .ok()
                .body(Collections.singletonMap("countResult", milestoneService.count()));
    }

    @GetMapping(value = "/count", params = "isOpen")
    public ResponseEntity<?> getMilestoneCountByOpenCondition(@RequestParam(value = "isOpen", defaultValue = "true") boolean openStatus) {
        return ResponseEntity
                .ok()
                .body(Collections.singletonMap("countResult", milestoneService.countByOpenCondition(openStatus)));
    }

    @PatchMapping("/status")
    public ResponseEntity<Void> updateStatus(@RequestParam("milestoneId") @MilestoneId String milestoneId,
                                             @RequestParam("isOpen") boolean isOpen) {
        milestoneService.updateStatus(milestoneId, isOpen);
        return ResponseEntity
                .ok()
                .build();
    }
}
