package team08.issuetracker.count.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team08.issuetracker.count.dto.LabelMilestoneCountsResponse;
import team08.issuetracker.count.service.CountService;

@RestController
@RequiredArgsConstructor
@RequestMapping("count")
public class CountController {
    private final CountService countService;

    @GetMapping
    public ResponseEntity<LabelMilestoneCountsResponse> getLabelMilestoneCounts() {
        LabelMilestoneCountsResponse response = countService.getLabelMilestoneCounts();
        return ResponseEntity.ok(response);
    }
}
