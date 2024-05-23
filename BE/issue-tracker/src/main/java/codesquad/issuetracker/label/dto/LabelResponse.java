package codesquad.issuetracker.label.dto;

import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.label.TextColor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LabelResponse {

    Long id;
    String name;
    String description;
    TextColor textColor;
    String backgroundColor;
    int labelCount;
    int milestoneCount;

    public static LabelResponse of(Label label, int labelCount, int milestoneCount) {
        return LabelResponse.builder()
            .id(label.getId())
            .name(label.getName())
            .description(label.getDescription())
            .backgroundColor(label.getBackgroundColor())
            .textColor(label.getTextColor())
            .labelCount(labelCount)
            .milestoneCount(milestoneCount)
            .build();
    }
}
