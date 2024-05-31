package team08.issuetracker.exception.member;

public class MemberPasswordMismatchException extends RuntimeException {
    private static final String ERROR_MESSAGE = "회원정보의 비밀번호가 일치하지 않습니다.";

    public MemberPasswordMismatchException() {
        super(ERROR_MESSAGE);
    }
}
