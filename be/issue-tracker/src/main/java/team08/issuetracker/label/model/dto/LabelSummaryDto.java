package team08.issuetracker.label.model.dto;

import lombok.Getter;
import team08.issuetracker.label.model.Label;

@Getter
public class LabelSummaryDto {
    private final Long id;
    private final String name;
    private final String backgroundColor;
    private final Boolean textBright;

    public LabelSummaryDto(Label label) {
        this.id = label.getId();
        this.name = label.getName();
        this.backgroundColor = label.getBackgroundColor();
        this.textBright = label.getTextBright();
    }
}
