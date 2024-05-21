package team08.issuetracker.label.model.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class LabelOverviewResponse {
    private LabelCountResponse labelCount;
    private List<LabelResponse> labels;

    public LabelOverviewResponse(LabelCountResponse labelCount, List<LabelResponse> labels) {
        this.labelCount = labelCount;
        this.labels = labels;
    }
}
