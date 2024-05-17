package com.codesquad.team3.issuetracker.domain.labels.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table(name ="label")
@Getter
@RequiredArgsConstructor
public class Label {

    @Id
    private Integer id;
    private final String title;
    private final String description;
    private final String color;
    private boolean isDeleted;

}
