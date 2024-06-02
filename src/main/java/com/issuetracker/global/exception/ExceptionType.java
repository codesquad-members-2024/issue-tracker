package com.issuetracker.global.exception;

import com.issuetracker.global.exception.comment.CommentNotFoundException;
import com.issuetracker.global.exception.issue.IssueNotFoundException;
import com.issuetracker.global.exception.label.LabelDuplicateException;
import com.issuetracker.global.exception.label.LabelNotFoundException;
import com.issuetracker.global.exception.member.*;
import com.issuetracker.global.exception.milestone.MilestoneDuplicateException;
import com.issuetracker.global.exception.milestone.MilestoneNotFoundException;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.Arrays;
import java.util.Optional;

@Getter
@Slf4j
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public enum ExceptionType {

    /**
     * Global Exception
     */
    UNHANDLED(1000, "알 수 없는 서버 에러가 발생했습니다.", null),
    METHOD_ARGUMENT_NOT_VALID(1001, "요청 데이터가 유효하지 않습니다.", MethodArgumentNotValidException.class),
    NO_RESOURCE(1002, "해당 요청에 대한 리소스가 존재하지 않습니다.", NoResourceFoundException.class),

    /**
     * Auth (2XXX)
     */
    INVALID_LOGIN_DATA(2000, "아이디 또는 비밀번호가 일치하지 않습니다.", InvalidLoginDataException.class),
    INVALID_TOKEN(2001, "유효하지 않은 JWT 토큰입니다.", InvalidTokenException.class),
    TOKEN_EXPIRED(2002, "만료된 JWT 토큰입니다.", TokenExpiredException.class),
    TOKEN_NOT_EXISTS(2003, "인증이 필요한 요청입니다.", TokenNotExistException.class),

    /**
     * Member (25XX)
     */
    MEMBER_NOT_FOUND(2500, "존재하지 않는 사용자입니다.", MemberNotFoundException.class),
    MEMBER_ALREADY_EXISTS(2501, "이미 존재하는 사용자입니다.", MemberDuplicateException.class),

    /**
     * Issue (3XXX)
     */
    ISSUE_NOT_FOUND(3000, "존재하지 않는 이슈입니다.", IssueNotFoundException.class),

    /**
     * Label (4XXX)
     */
    LABEL_NOT_FOUND(4000, "존재하지 않는 레이블입니다.", LabelNotFoundException.class),
    LABEL_ALREADY_EXISTS(4001, "이미 존재하는 레이블입니다.", LabelDuplicateException.class),

    /**
     * Milestone (5XXX)
     */
    MILESTONE_NOT_FOUND(5001, "존재하지 않는 마일스톤입니다.", MilestoneNotFoundException.class),
    MILESTONE_ALREADY_EXISTS(5002, "이미 존재하는 마일스톤입니다.", MilestoneDuplicateException.class),

    /**
     * Comment (6XXX)
     */
    COMMENT_NOT_FOUND(6001, "존재하지 않는 댓글입니다.", CommentNotFoundException.class),

    /**
     * Search (7XXX)
     */
    ;

    private final Integer code;
    private final String message;
    private final Class<? extends Exception> type;

    public static Optional<ExceptionType> of(Class<? extends Exception> clazz) {
        Optional<ExceptionType> exceptionType = Arrays.stream(values())
                .filter(ex -> ex.getType() != null && ex.getType().equals(clazz))
                .findFirst();

        if(exceptionType.isEmpty()) {
            log.error("정의되지 않은 예외가 발생했습니다. : {}", clazz);
        }

        return exceptionType;
    }

}
