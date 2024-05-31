package team08.issuetracker.exception.quertstate;

public class QueryStateException extends RuntimeException {
    private static final String ERROR_MESSAGE = "쿼리 state 값이 유효하지 않습니다.";

    public QueryStateException() {
        super(ERROR_MESSAGE);
    }
}
