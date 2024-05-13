package team08.issuetracker.exception;


import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.ResponseEntity;
import team08.issuetracker.exception.member.InvalidRegisterFormException;
import team08.issuetracker.exception.member.MemberNotFoundException;
import team08.issuetracker.exception.member.MemberPasswordMismatchException;

@ControllerAdvice
@Slf4j
public class ExceptionController {
    private String error_msg;

    @ExceptionHandler(InvalidRegisterFormException.class)
    public ResponseEntity<String> handleInvalidRegisterFormException(InvalidRegisterFormException e) {
        error_msg = "회원가입 폼이 유효하지 않습니다.";
        log.error(e.getClass().getSimpleName() + " : " + error_msg);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error_msg);
    }

    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<String> handleMemberNotFoundException(MemberNotFoundException e) {
        error_msg = "존재하는 ID가 없습니다.";
        log.error(e.getClass().getSimpleName() + " : " + error_msg);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error_msg);
    }

    @ExceptionHandler(MemberPasswordMismatchException.class)
    public ResponseEntity<String> handleMemberPasswordMismatchException(MemberPasswordMismatchException e) {
        error_msg = "회원정보의 비밀번호가 일치하지 않습니다.";
        log.error(e.getClass().getSimpleName() + " : " + error_msg);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error_msg);
    }



    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<String> handleDuplicateKeyException(DuplicateKeyException e) {
        error_msg = "이미 존재하는 ID로는 회원가입 할 수 없습니다.";
        log.error(e.getClass().getSimpleName() + " : " + error_msg);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error_msg);
    }


}
