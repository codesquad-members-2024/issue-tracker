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
    Long labelCount;
    Long milestoneCount;

    public static LabelResponse of(Label label, Long labelCount, Long milestoneCount) {
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
