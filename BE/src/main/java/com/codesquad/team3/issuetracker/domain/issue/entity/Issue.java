package com.codesquad.team3.issuetracker.domain.issue.entity;

import com.codesquad.team3.issuetracker.global.entity.OpenCloseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;


import java.time.LocalDateTime;

@Table(name="ISSUE")
@Getter
@NoArgsConstructor
public class Issue implements OpenCloseEntity {

    @Id
    private Integer id;
    private Integer writerId;
    private String title;
    private LocalDateTime createTime;

    private Integer milestoneId;
    private boolean isClosed;
    private boolean isDeleted;


    public Issue(Integer writerId, String title, LocalDateTime createTime, Integer milestoneId) {
        this.writerId = writerId;
        this.title = title;
        this.createTime = createTime;
        this.milestoneId = milestoneId;
    }

    @Override
    public void close() {
        this.isClosed = true;
    }

    @Override
    public void open() {
        this.isClosed = false;
    }

    @Override
    public boolean isClosed() {
        return this.isClosed;
    }


}
