package team08.issuetracker.label.model.dto;

import team08.issuetracker.label.model.Label;

public record LabelCreationDto(String name,
                               String description,
                               String backgroundColor,
                               String textColor) {

    public Label toEntity(){
        return new Label(name, description, backgroundColor, textColor);
    }
}
