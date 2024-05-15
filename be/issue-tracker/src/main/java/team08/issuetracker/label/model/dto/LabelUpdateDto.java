package team08.issuetracker.label.model.dto;

public record LabelUpdateDto(String name,
                             String description,
                             String backgroundColor,
                             String textColor) {
}
