package com.issuetracker.domain.issue;

import com.issuetracker.domain.common.BaseDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Issue extends BaseDateTime {

    @Id
    @Column("ISSUE_ID")
    private Long id;
    private String memberId;
    private String title;
    private String content;
}
