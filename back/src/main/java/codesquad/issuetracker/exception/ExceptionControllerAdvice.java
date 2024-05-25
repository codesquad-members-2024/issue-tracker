package codesquad.issuetracker.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ExceptionControllerAdvice {

    @ExceptionHandler(IssueNotFoundException.class)
    public ResponseEntity<String> handleIssueNotFoundEx(IssueNotFoundException e) {
        log.error("[IssueNotFoundException] {}", e.getMessage());
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(LabelNotFoundException.class)
    public ResponseEntity<String> handleLabelNotFoundEx(LabelNotFoundException e) {
        log.error("[LabelNotFoundException] {}", e.getMessage());
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MilestoneNotFoundException.class)
    public ResponseEntity<String> handleMilestoneNotFoundEx(MilestoneNotFoundException e) {
        log.error("[MilestoneNotFoundException] {}", e.getMessage());
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
}
