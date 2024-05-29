package team08.issuetracker.exception.interceptor;

public class UnauthorizedAccessException extends RuntimeException{
    private static final String ERROR_MESSAGE = "로그인 하지 않은 사용자 입니다";

    public UnauthorizedAccessException() {
        super(ERROR_MESSAGE);
    }
}
