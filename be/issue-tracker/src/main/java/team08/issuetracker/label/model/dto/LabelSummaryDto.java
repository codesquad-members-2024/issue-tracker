package team08.issuetracker.label.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import team08.issuetracker.label.model.Label;

@Getter
public class LabelSummaryDto {
    private final String name;
    private final String backgroundColor;
    private final Boolean textBright;

    public LabelSummaryDto(Label label) {
        this.name = label.getName();
        this.backgroundColor = label.getBackgroundColor();
        this.textBright = label.getTextBright();
    }
}
