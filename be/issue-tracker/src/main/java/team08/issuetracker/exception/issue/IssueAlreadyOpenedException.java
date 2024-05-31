package team08.issuetracker.exception.issue;

public class IssueAlreadyOpenedException extends RuntimeException {
    private static final String ERROR_MESSAGE = "이미 Opened인 이슈의 상태를 Open 할 수 없습니다.";
    public IssueAlreadyOpenedException() {
        super(ERROR_MESSAGE);
    }
}
