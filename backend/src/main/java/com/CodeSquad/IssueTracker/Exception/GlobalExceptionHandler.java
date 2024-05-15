package com.CodeSquad.IssueTracker.Exception;

import com.CodeSquad.IssueTracker.Exception.label.*;
import com.CodeSquad.IssueTracker.Exception.issue.AuthorNotFoundException;
import com.CodeSquad.IssueTracker.Exception.issue.InvalidIssueDataException;
import com.CodeSquad.IssueTracker.Exception.user.InvalidCredentialException;
import com.CodeSquad.IssueTracker.Exception.user.InvalidUserFormatException;
import com.CodeSquad.IssueTracker.Exception.user.UserAlreadyExistsException;
import com.CodeSquad.IssueTracker.Exception.user.UserNotLoginException;
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

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(InvalidCredentialException.class)
    public ResponseEntity<String> handleAuthenticationFailedException(InvalidCredentialException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(UserNotLoginException.class)
    public ResponseEntity<String> handleUserNotLoginException(UserNotLoginException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }
    @ExceptionHandler(InvalidLabelIdException.class)
    public ResponseEntity<String> handleInvalidLabelIdException(InvalidLabelIdException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(EmptyLabelNameException.class)
    public ResponseEntity<String> handleEmptyLabelNameException(EmptyLabelNameException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(InvalidLabelColorException.class)
    public ResponseEntity<String> handleInvalidLabelColorException(InvalidLabelColorException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
    @ExceptionHandler(LabelNotFoundException.class)
    public ResponseEntity<String> handleLabelNotFoundException(LabelNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(LabelUpdateException.class)
    public ResponseEntity<String> handleLabelUpdateException(LabelUpdateException ex) {
      
    @ExceptionHandler(AuthorNotFoundException.class)
    public ResponseEntity<String> handleAuthorNotFoundException(AuthorNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(InvalidIssueDataException.class)
    public ResponseEntity<String> handleInvalidIssueDataException(InvalidIssueDataException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}