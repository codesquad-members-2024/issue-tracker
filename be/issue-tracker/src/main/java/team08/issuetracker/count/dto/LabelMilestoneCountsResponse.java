package team08.issuetracker.count.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class LabelMilestoneCountsResponse {
    private final long totalLabelCounts;
    private final long totalMilestoneCounts;
}
