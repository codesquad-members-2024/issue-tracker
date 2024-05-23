package codesquad.issuetracker.exception;

import static codesquad.issuetracker.exception.ErrorCode.NOT_FOUND;
import static codesquad.issuetracker.exception.ErrorCode.USER_ALREADY_EXIST;

import java.util.NoSuchElementException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException e) {
        return ResponseEntity.status(NOT_FOUND.getStatus()).body(NOT_FOUND.getMessage());
    }

    @ExceptionHandler(UserAlreadyExist.class)
    public ResponseEntity<String> handleUserAlreadyExist() {
        return ResponseEntity.status(USER_ALREADY_EXIST.getStatus()).body(USER_ALREADY_EXIST.getMessage());
    }

}

