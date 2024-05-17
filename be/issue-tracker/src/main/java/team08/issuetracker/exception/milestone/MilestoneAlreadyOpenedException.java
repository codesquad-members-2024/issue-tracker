package team08.issuetracker.exception.milestone;

public class MilestoneAlreadyOpenedException extends RuntimeException {
    private static final String ERROR_MESSAGE = "이미 Opened인 마일스톤의 상태를 Open 할 수 없습니다.";
    public MilestoneAlreadyOpenedException() {
        super(ERROR_MESSAGE);
    }
}
