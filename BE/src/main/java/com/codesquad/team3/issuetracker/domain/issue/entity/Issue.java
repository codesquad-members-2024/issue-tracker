package com.codesquad.team3.issuetracker.domain.issue.entity;

import com.codesquad.team3.issuetracker.global.entity.OpenCloseEntity;
import com.codesquad.team3.issuetracker.global.entity.SoftDeleteEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("ISSUE")
@AllArgsConstructor
@Getter
@Builder
public class Issue implements SoftDeleteEntity, OpenCloseEntity {

    @Id
    private int id;

    private Integer writer_id;

    private String title;


    @CreatedDate
    private final LocalDateTime create_time;

    private boolean is_closed;
    private Integer milestone_id;
    private boolean is_deleted;

    @Override
    public void close() {
        this.is_closed = true;
    }

    @Override
    public void open() {
        this.is_closed = false;
    }

    @Override
    public boolean isClosed() {
        return this.is_closed;
    }

    @Override
    public void delete() {
        this.is_deleted = true;
    }

    @Override
    public void recover() {
        this.is_deleted = false;
    }

    @Override
    public boolean isDeleted() {
        return this.is_deleted;
    }
}
