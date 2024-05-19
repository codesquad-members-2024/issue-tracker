package com.codesquad.team3.issuetracker.domain.comment.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("COMMENT")
@AllArgsConstructor
@Getter
public class Comment {

    @Id
    private Integer id;
    private String writer_name;
    private String contents;

    @CreatedDate
    private LocalDateTime create_time;
    private Integer issue_id;
    private boolean is_deleted;
    private boolean is_primary;
}
