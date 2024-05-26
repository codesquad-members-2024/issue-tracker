package codesquad.issuetracker.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    NOT_FOUND(HttpStatus.NOT_FOUND, "해당 데이터가 존재하지 않습니다."),
    USER_ALREADY_EXIST(HttpStatus.CONFLICT , "이미 존재하는 ID 입니다."),
    PASSWORD_MISMATCH(HttpStatus.UNAUTHORIZED , "비밀번호가 존재하지 않습니다.");

    private final HttpStatus status;
    private final String message;

}
