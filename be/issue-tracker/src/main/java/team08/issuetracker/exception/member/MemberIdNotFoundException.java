package team08.issuetracker.exception.member;

public class MemberIdNotFoundException extends RuntimeException {
    private static final String ERROR_MESSAGE = "존재하는 ID가 없습니다.";

    public MemberIdNotFoundException() {
        super(ERROR_MESSAGE);
    }
}
