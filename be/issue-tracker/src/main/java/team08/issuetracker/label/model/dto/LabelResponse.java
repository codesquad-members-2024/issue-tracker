package team08.issuetracker.label.model.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class LabelResponse {
    private LabelCountDto labelCount;
    private List<LabelDto> labels;

    public LabelResponse(LabelCountDto labelCount, List<LabelDto> labels) {
        this.labelCount = labelCount;
        this.labels = labels;
    }
}
