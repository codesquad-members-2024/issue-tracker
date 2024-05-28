package team08.issuetracker.count.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import team08.issuetracker.count.dto.LabelMilestoneCountsResponse;
import team08.issuetracker.label.service.LabelService;
import team08.issuetracker.milestone.service.MilestoneService;

@Service
@RequiredArgsConstructor
public class CountService {
    private final MilestoneService milestoneService;
    private final LabelService labelService;

    public LabelMilestoneCountsResponse getLabelMilestoneCounts() {
        return new LabelMilestoneCountsResponse(
                labelService.getTotalMilestoneCounts(),
                milestoneService.getTotalMilestoneCounts()
        );
    }
}
