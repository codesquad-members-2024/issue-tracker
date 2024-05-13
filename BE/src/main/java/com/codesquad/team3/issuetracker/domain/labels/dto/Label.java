package com.codesquad.team3.issuetracker.domain.labels.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class Label {

    private final String name;
    private final String description;
    private final String color;

    public Label(String name, String description, String color) {
        this.name = name;
        this.description = description;
        this.color = color;
    }
}
