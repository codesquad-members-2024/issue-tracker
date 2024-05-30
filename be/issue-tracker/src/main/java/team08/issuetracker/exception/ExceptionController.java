package team08.issuetracker.exception;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.ResponseEntity;
import team08.issuetracker.exception.comment.CommentNotFoundException;
import team08.issuetracker.exception.interceptor.UnauthorizedAccessException;
import team08.issuetracker.exception.issue.InvalidIssueTitleUpdateFormException;
import team08.issuetracker.exception.member.InvalidRegisterFormException;

import team08.issuetracker.exception.member.MemberIdDuplicateException;
import team08.issuetracker.exception.member.MemberIdNotFoundException;
import team08.issuetracker.exception.member.MemberPasswordMismatchException;
import team08.issuetracker.exception.milestone.InvalidMilestoneFormException;
import team08.issuetracker.exception.milestone.MilestoneAlreadyClosedException;
import team08.issuetracker.exception.milestone.MilestoneAlreadyOpenedException;
import team08.issuetracker.exception.milestone.MilestoneIdNotFoundException;
import team08.issuetracker.exception.milestone.MilestoneQueryStateException;
import team08.issuetracker.exception.label.LabelNotFoundException;

@ControllerAdvice
@Slf4j
public class ExceptionController {
    @ExceptionHandler(InvalidRegisterFormException.class)
    public ResponseEntity<ErrorResponse> handleInvalidRegisterFormException(InvalidRegisterFormException e) {
        ErrorResponse response = ErrorResponse.from(e);
        log.error(response.toString());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(MemberIdNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleMemberNotFoundException(MemberIdNotFoundException e) {
        ErrorResponse response = ErrorResponse.from(e);
        log.error(response.toString());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(MemberPasswordMismatchException.class)
    public ResponseEntity<ErrorResponse> handleMemberPasswordMismatchException(MemberPasswordMismatchException e) {
        ErrorResponse response = ErrorResponse.from(e);
        log.error(response.toString());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(InvalidMilestoneFormException.class)
    public ResponseEntity<ErrorResponse> handleInvalidMilestoneFormException(InvalidMilestoneFormException e) {
        ErrorResponse response = ErrorResponse.from(e);
        log.error(response.toString());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(MilestoneIdNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleMilestoneNotFoundException(MilestoneIdNotFoundException e) {
        ErrorResponse response = ErrorResponse.from(e);
        log.error(response.toString());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(MilestoneAlreadyOpenedException.class)
    public ResponseEntity<ErrorResponse> handleMilestoneAlreadyOpenedException(MilestoneAlreadyOpenedException e) {
        ErrorResponse response = ErrorResponse.from(e);
        log.error(response.toString());
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(response);
    }

    @ExceptionHandler(MilestoneAlreadyClosedException.class)
    public ResponseEntity<ErrorResponse> handleMilestoneAlreadyClosedException(MilestoneAlreadyClosedException e) {
        ErrorResponse response = ErrorResponse.from(e);
        log.error(response.toString());
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(response);
    }

    @ExceptionHandler(MemberIdDuplicateException.class)
    public ResponseEntity<ErrorResponse> handleMemberIdDuplicateKeyException(MemberIdDuplicateException e) {
        ErrorResponse response = ErrorResponse.from(e);
        log.error(response.toString());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(MilestoneQueryStateException.class)
    public ResponseEntity<ErrorResponse> handleMilestoneQueryStateException(MilestoneQueryStateException e) {
        ErrorResponse response = ErrorResponse.from(e);
        log.error(response.toString());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(LabelNotFoundException.class)
    public ResponseEntity<ErrorResponse> handLabelNotFoundException(LabelNotFoundException e) {
        ErrorResponse response = ErrorResponse.from(e);
        log.error(response.toString());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler()
    public ResponseEntity<ErrorResponse> handleInvalidIssueTitleUpdateFormException(InvalidIssueTitleUpdateFormException e) {
        ErrorResponse response = ErrorResponse.from(e);
        log.error(response.toString());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(CommentNotFoundException.class)
    public ResponseEntity<ErrorResponse> handCommentNotFoundException(CommentNotFoundException e) {
        ErrorResponse response = ErrorResponse.from(e);
        log.error(response.toString());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedAccessException(UnauthorizedAccessException e) {
        ErrorResponse response = ErrorResponse.from(e);
        log.error(response.toString());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}
