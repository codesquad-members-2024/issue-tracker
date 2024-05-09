package com.CodeSquad.IssueTracker.user;

import com.CodeSquad.IssueTracker.user.utils.UserValidate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean save(User user) {
        log.info("사용자 저장 시도: {}", user.getUserId());

        if (userRepository.existsByUserID(user.getUserId())) {
            log.error("사용자 ID 중복: {}", user.getUserId());
            return false;
        }

        if (verifyUserInfo(user)) {
            userRepository.save(user);
            log.info("사용자 저장 성공: {}", user.getUserId());
            return true;
        } else {
            return false;
        }
    }

    private boolean verifyUserInfo(User user) {
        if (!UserValidate.isUserIdValid(user.getUserId())) {
            log.error("사용자 ID 유효성 검증 실패: {}", user.getUserId());
            return false;
        }
        if (!UserValidate.isUserPasswordValid(user.getUserPassword())) {
            log.error("사용자 비밀번호 유효성 검증 실패: {}", user.getUserId());
            return false;
        }
        if (!UserValidate.isUserNicknameValid(user.getUserNickname())) {
            log.error("사용자 닉네임 유효성 검증 실패: {}", user.getUserId());
            return false;
        }
        return true;
    }
}
