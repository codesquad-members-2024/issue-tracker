package com.codesquad.team3.issuetracker.domain.labels.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LabelForm {

    private final String title;
    private final String description;
    private final String color;

}
