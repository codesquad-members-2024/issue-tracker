package team08.issuetracker.exception.issue;

public class IssueAlreadyClosedException extends RuntimeException {
    private static final String ERROR_MESSAGE = "이미 Closed인 이슈의 상태를 Close 할 수 없습니다.";
    public IssueAlreadyClosedException() {
        super(ERROR_MESSAGE);
    }
}
