package team08.issuetracker.exception.label;

public class LabelNotFoundException extends RuntimeException {
    private static final String ERROR_MESSAGE = "라벨이 존재하지 않습니다.";

    public LabelNotFoundException() {
        super(ERROR_MESSAGE);
    }
}
