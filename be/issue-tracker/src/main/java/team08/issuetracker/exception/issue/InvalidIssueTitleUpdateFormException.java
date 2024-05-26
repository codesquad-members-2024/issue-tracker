package team08.issuetracker.exception.issue;

public class InvalidIssueTitleUpdateFormException extends RuntimeException{
    private static final String ERROR_MESSAGE = "이슈의 제목은 필수값 입니다.";

    public InvalidIssueTitleUpdateFormException() {
        super(ERROR_MESSAGE);
    }
}
