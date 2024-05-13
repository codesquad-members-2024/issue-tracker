package com.issuetracker.domain.label.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LabelResponse {

    private String labelId;
    private String description;
    private String textColor;
    private String colorCode;

    public static LabelResponse of(com.issuetracker.domain.label.Label label) {
        return LabelResponse.builder()
                .labelId(label.getId())
                .description(label.getDescription())
                .textColor(label.getTextColor())
                .colorCode(label.getColorCode())
                .build();
    }
}
