package codesquad.issuetracker.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    NOT_FOUND(HttpStatus.NOT_FOUND, "해당 데이터가 존재하지 않습니다.");

    private final HttpStatus status;
    private final String message;

}
