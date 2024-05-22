package codesquad.issuetracker.label.dto;

import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.label.TextColor;
import lombok.AllArgsConstructor;
import lombok.Value;

@Value
@AllArgsConstructor
public class LabelRequest {

    String name;
    String description;
    TextColor textColor;
    String backgroundColor;

    public Label toEntity() {
        return Label.builder()
            .name(name)
            .description(description)
            .textColor(textColor)
            .backgroundColor(backgroundColor)
            .build();
    }
}
