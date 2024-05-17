package team08.issuetracker.exception.milestone;

public class InvalidMilestoneFormException extends RuntimeException {
    private static final String ERROR_MESSAGE = "마일스톤 생성 폼이 유효하지 않습니다.";

    public InvalidMilestoneFormException() {
        super(ERROR_MESSAGE);
    }
}
