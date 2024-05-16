package com.issuetracker.domain.milestone;

import com.issuetracker.domain.common.BaseDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Milestone extends BaseDateTime {

    @Id
    @Column("MILESTONE_ID")
    private Long id;
    private String name;

    @Builder.Default
    private boolean isOpen = true;
    private LocalDateTime dueDate;
    private String description;
}
