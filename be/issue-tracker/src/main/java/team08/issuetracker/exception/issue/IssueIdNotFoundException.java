package team08.issuetracker.exception.issue;

public class IssueIdNotFoundException extends RuntimeException{
    private static final String ERROR_MESSAGE = "해당하는 id의 이슈를 찾을 수 없습니다.";

    public IssueIdNotFoundException() {
        super(ERROR_MESSAGE);
    }
}
