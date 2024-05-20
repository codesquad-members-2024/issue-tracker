package team08.issuetracker.label.model.dto;

import lombok.Data;
import team08.issuetracker.label.model.Label;

@Data
public class LabelDto {
    private Long id;
    private String name;
    private String description;
    private String backgroundColor;
    private String textColor;

    public LabelDto(Label label) {
        this.id = label.getId();
        this.name = label.getName();
        this.description = (label.getDescription() != null) ? label.getDescription() : "";
        this.backgroundColor = label.getBackgroundColor();
        this.textColor = label.getTextColor();
    }
}
