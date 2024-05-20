package team08.issuetracker.exception;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.ResponseEntity;
import team08.issuetracker.exception.member.InvalidRegisterFormException;

import team08.issuetracker.exception.member.MemberIdDuplicateException;
import team08.issuetracker.exception.member.MemberIdNotFoundException;
import team08.issuetracker.exception.member.MemberPasswordMismatchException;
import team08.issuetracker.exception.milestone.InvalidMilestoneFormException;
import team08.issuetracker.exception.milestone.MilestoneAlreadyClosedException;
import team08.issuetracker.exception.milestone.MilestoneAlreadyOpenedException;
import team08.issuetracker.exception.milestone.MilestoneIdNotFoundException;
import team08.issuetracker.exception.milestone.MilestoneQueryStateException;

import static team08.issuetracker.exception.ExceptionMessageBuilder.buildMessage;

@ControllerAdvice
@Slf4j
public class ExceptionController {
    @ExceptionHandler(InvalidRegisterFormException.class)
    public ResponseEntity<String> handleInvalidRegisterFormException(InvalidRegisterFormException e) {
        log.error(buildMessage(e));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(MemberIdNotFoundException.class)
    public ResponseEntity<String> handleMemberNotFoundException(MemberIdNotFoundException e) {
        log.error(buildMessage(e));
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(MemberPasswordMismatchException.class)
    public ResponseEntity<String> handleMemberPasswordMismatchException(MemberPasswordMismatchException e) {
        log.error(buildMessage(e));
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(InvalidMilestoneFormException.class)
    public ResponseEntity<String> handleInvalidMilestoneFormException(InvalidMilestoneFormException e) {
        log.error(buildMessage(e));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(MilestoneIdNotFoundException.class)
    public ResponseEntity<String> handleMilestoneNotFoundException(MilestoneIdNotFoundException e) {
        log.error(buildMessage(e));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(MilestoneAlreadyOpenedException.class)
    public ResponseEntity<String> handleMilestoneAlreadyOpenedException(MilestoneAlreadyOpenedException e) {
        log.error(buildMessage(e));
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(e.getMessage());
    }

    @ExceptionHandler(MilestoneAlreadyClosedException.class)
    public ResponseEntity<String> handleMilestoneAlreadyClosedException(MilestoneAlreadyClosedException e) {
        log.error(buildMessage(e));
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(e.getMessage());
    }

    @ExceptionHandler(MemberIdDuplicateException.class)
    public ResponseEntity<String> handleMemberIdDuplicateKeyException(MemberIdDuplicateException e) {
        log.error(buildMessage(e));
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(MilestoneQueryStateException.class)
    public ResponseEntity<String> handleMilestoneQueryStateException(MilestoneQueryStateException e) {
        log.error(buildMessage(e));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}

