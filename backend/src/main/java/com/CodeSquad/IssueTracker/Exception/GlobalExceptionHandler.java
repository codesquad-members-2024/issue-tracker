package com.CodeSquad.IssueTracker.Exception;

import com.CodeSquad.IssueTracker.Exception.milestone.InvalidMilestoneRequestException;
import com.CodeSquad.IssueTracker.Exception.milestone.MilestoneNotFoundException;
import com.CodeSquad.IssueTracker.Exception.user.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidUserFormatException.class)
    public ResponseEntity<String> handleInvalidCredentialsException(InvalidUserFormatException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(UserNotLoginException.class)
    public ResponseEntity<String> handleUserNotLoginException(UserNotLoginException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler(InvalidCredentialException.class)
    public ResponseEntity<String> handleInvalidCredentialException(InvalidCredentialException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    //milestone
    @ExceptionHandler(MilestoneNotFoundException.class)
    public ResponseEntity<String> handleMilestoneNotFoundException(MilestoneNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(InvalidMilestoneRequestException.class)
    public ResponseEntity<String> handleInvalidMilestoneRequestException(InvalidMilestoneRequestException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}