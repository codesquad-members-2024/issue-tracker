package com.issuetracker.domain.label.request;

import com.issuetracker.domain.label.Label;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LabelCreateRequest {

    @NotBlank
    @Size(max = 20)
    private String labelId;

    @Size(max = 50)
    private String description;

    @Size(min=7, max = 7)
    private String textColor;

    @Size(min=7, max = 7)
    private String colorCode;

    public Label toEntity() {
        return Label.builder()
                .id(labelId)
                .description(description)
                .textColor(textColor)
                .colorCode(colorCode)
                .build();
    }
}
