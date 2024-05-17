package team08.issuetracker.exception.milestone;

public class MilestoneAlreadyClosedException extends RuntimeException {
    private static final String ERROR_MESSAGE = "이미 Closed인 마일스톤의 상태를 Close 할 수 없습니다.";
    public MilestoneAlreadyClosedException() {
        super(ERROR_MESSAGE);
    }
}
