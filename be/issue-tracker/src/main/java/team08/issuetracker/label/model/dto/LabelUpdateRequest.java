package team08.issuetracker.label.model.dto;

public record LabelUpdateRequest(String name,
                                 String description,
                                 String backgroundColor,
                                 Boolean textBright) {
}
