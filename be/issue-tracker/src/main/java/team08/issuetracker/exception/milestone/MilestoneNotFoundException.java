package team08.issuetracker.exception.milestone;

public class MilestoneNotFoundException extends RuntimeException {

    private static final String ERROR_MESSAGE = "해당하는 id의 마일스톤을 찾을 수 없습니다.";

    public MilestoneNotFoundException() {
        super(ERROR_MESSAGE);
    }
}
