package com.CodeSquad.IssueTracker.user;
import com.CodeSquad.IssueTracker.user.dto.LoginRequest;
import com.CodeSquad.IssueTracker.Exception.user.InvalidUserFormatException;
import com.CodeSquad.IssueTracker.user.utils.UserValidate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Objects;
import java.util.Optional;

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

        if (verifyUserInfo(user)) {
            userRepository.save(user);
            log.info("사용자 저장 성공: {}", user.getUserId());
            return true;
        }
        return false;
    }

    public boolean verifyUserInfo(User user) {
        if (!UserValidate.isUserIdValid(user.getUserId())) {
            log.error("사용자 ID 유효성 검증 실패: {}", user.getUserId());
            throw new InvalidUserFormatException("ID가 형식에 맞지 않습니다.");
        }
        if (!UserValidate.isUserPasswordValid(user.getUserPassword())) {
            log.error("사용자 비밀번호 유효성 검증 실패: {}", user.getUserId());
            throw new InvalidUserFormatException("비밀번호가 형식에 맞지 않습니다.");
        }
        if (!UserValidate.isUserNicknameValid(user.getUserNickname())) {
            log.error("사용자 닉네임 유효성 검증 실패: {}", user.getUserId());
            throw new InvalidUserFormatException("닉네임이 형식에 맞지 않습니다.");
        }
        return true;
    }
    public boolean isUserIdDuplicated(String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.isPresent();
    }

    public boolean authenticate(String userId, String userPassword) {
        Optional<User> userOptional = userRepository.findById(userId);
        System.out.println(userOptional);
        if (userOptional.isPresent()) {
            if (Objects.equals(userOptional.get().getUserPassword(), userPassword)){
                log.info("로그인 성공: {}", userId);
                return true;
            }
        }
        log.warn("로그인 실패: {}", userId);
        return false;
    }

    public boolean isUserNotExists(User user) {
        if (user == null){
            log.warn("유저를 받아오지 못하였습니다.");
            return true;
        }
        log.info("새 유저가 회원가입하였습니다.: {}", user);
        return false;
    }

    public boolean isLoginRequestNotExists(LoginRequest loginRequest) {
        if (loginRequest == null){
            log.warn("로그인 실패: 로그인 데이터가 없습니다.");
            return true;
        }
        log.info("로그인 시도");
        return false;
    }


}
