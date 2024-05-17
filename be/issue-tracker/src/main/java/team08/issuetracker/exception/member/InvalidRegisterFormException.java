package team08.issuetracker.exception.member;

public class InvalidRegisterFormException extends RuntimeException {
    private static final String ERROR_MESSAGE = "회원가입 폼이 유효하지 않습니다.";

    public InvalidRegisterFormException() {
        super(ERROR_MESSAGE);
    }
}
