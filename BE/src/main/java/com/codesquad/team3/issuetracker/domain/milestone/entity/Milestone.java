package com.codesquad.team3.issuetracker.domain.milestone.entity;

import com.codesquad.team3.issuetracker.global.entity.OpenCloseEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

@Getter
@RequiredArgsConstructor
public class Milestone extends OpenCloseEntity {

    @Id
    private Integer id;
    private final String title;
    private final String description;
    private final LocalDate deadline;

    private boolean isClosed;
    private boolean isDeleted;

}
