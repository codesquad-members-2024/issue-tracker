package team08.issuetracker.exception.member;

import org.springframework.dao.DuplicateKeyException;

public class MemberIdDuplicateException extends DuplicateKeyException {
    private static final String ERROR_MESSAGE = "이미 존재하는 ID로는 회원가입 할 수 없습니다.";

    public MemberIdDuplicateException() {
        super(ERROR_MESSAGE);
    }
}
