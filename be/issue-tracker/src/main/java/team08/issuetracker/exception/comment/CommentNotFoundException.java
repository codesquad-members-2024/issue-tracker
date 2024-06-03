package team08.issuetracker.exception.comment;

public class CommentNotFoundException extends RuntimeException {
    private static final String ERROR_MESSAGE = "코멘트가 존재하지 않습니다.";

    public CommentNotFoundException() {
        super(ERROR_MESSAGE);
    }
}
