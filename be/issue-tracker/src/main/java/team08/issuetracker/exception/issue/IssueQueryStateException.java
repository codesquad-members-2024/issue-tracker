package team08.issuetracker.exception.issue;

public class IssueQueryStateException extends RuntimeException {
    private static final String ERROR_MESSAGE = "이슈 쿼리 state 값이 유효하지 않습니다.";

    public IssueQueryStateException() {
        super(ERROR_MESSAGE);
    }
}
