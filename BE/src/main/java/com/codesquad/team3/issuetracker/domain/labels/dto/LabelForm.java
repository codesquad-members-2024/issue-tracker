package com.codesquad.team3.issuetracker.domain.labels.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class LabelForm {

    private final String name;
    private final String description;
    private final String color;
}
