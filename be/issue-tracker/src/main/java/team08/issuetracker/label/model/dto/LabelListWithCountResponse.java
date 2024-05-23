package team08.issuetracker.label.model.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class LabelListWithCountResponse {
    private LabelCountResponse labelCount;
    private List<LabelResponse> labels;

    public LabelListWithCountResponse(LabelCountResponse labelCount, List<LabelResponse> labels) {
        this.labelCount = labelCount;
        this.labels = labels;
    }
}
