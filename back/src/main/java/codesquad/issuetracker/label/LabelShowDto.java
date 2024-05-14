package codesquad.issuetracker.label;

import lombok.Getter;

@Getter
public class LabelShowDto {

    private String name;
    private String description;
    private String color;

    public LabelShowDto(Label label) {
        this.name = label.getName();
        this.description = label.getDescription();
        this.color = label.getColor();
    }
}
