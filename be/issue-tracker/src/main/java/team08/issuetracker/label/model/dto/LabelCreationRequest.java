package team08.issuetracker.label.model.dto;

import team08.issuetracker.label.model.Label;

public record LabelCreationRequest(String name,
                                   String description,
                                   String backgroundColor,
                                   Boolean textBright) {

    public Label toEntity(){
        return new Label(name, description, backgroundColor, textBright);
    }
}
