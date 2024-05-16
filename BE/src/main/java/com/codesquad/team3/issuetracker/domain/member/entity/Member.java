package com.codesquad.team3.issuetracker.domain.member.entity;

import com.codesquad.team3.issuetracker.domain.member.dto.response.ResponseMember;
import com.codesquad.team3.issuetracker.global.entity.SoftDeleteEntity;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table(name="member")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Member extends SoftDeleteEntity {

    @Id
    private Integer id;
    private String memberId;
    private String password;
    private String nickname;
    private LocalDateTime birthday;
    @CreatedDate
    @Column("join_time")
    private LocalDateTime joinTime;
    private String email;
    private boolean isDeleted;

    public ResponseMember toResponse() {
        return new ResponseMember(memberId, nickname, birthday, joinTime, email);
    }
}