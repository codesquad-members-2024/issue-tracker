package team08.issuetracker.exception.milestone;

public class MilestoneQueryStateException extends RuntimeException {
    private static final String ERROR_MESSAGE = "마일스톤 쿼리 state 값이 유효하지 않습니다.";

    public MilestoneQueryStateException() {
        super(ERROR_MESSAGE);
    }
}
