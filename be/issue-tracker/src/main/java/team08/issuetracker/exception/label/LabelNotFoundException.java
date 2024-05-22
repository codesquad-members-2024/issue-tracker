package team08.issuetracker.exception.label;

public class LabelNotFoundException extends RuntimeException {
    private static final String ERROR_MESSAGE = "해당 id의 라벨을 찾을 수 없습니다.";
    public LabelNotFoundException() {
        super();
    }
}
