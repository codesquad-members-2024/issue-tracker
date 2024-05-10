package com.codesquad.team3.issuetracker.domain.labels.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Builder
@Getter
@RequiredArgsConstructor
public class Label {

    private final String name;
    private final String description;
    private final String color;

}
