package com.CodeSquad.IssueTracker.user;
import com.CodeSquad.IssueTracker.Exception.user.InvalidCredentialException;
import com.CodeSquad.IssueTracker.Exception.user.UserIdAlreadyExistException;
import com.CodeSquad.IssueTracker.Exception.user.UserNotFoundException;
import com.CodeSquad.IssueTracker.user.dto.LoginRequest;
import com.CodeSquad.IssueTracker.Exception.user.InvalidUserFormatException;
import com.CodeSquad.IssueTracker.user.utils.UserValidate;
import jakarta.servlet.http.HttpSession;
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

    public void save(User user) {
        log.info("사용자 저장 시도: {}", user.getUserId());
        verifyUserInfo(user);
        userRepository.save(user);
        log.info("사용자 저장 성공: {}", user.getUserId());
    }

    public void verifyUserInfo(User user) {
        if (!UserValidate.isUserIdValid(user.getUserId())) {
            log.error("사용자 ID 유효성 검증 실패: {}", user.getUserId());
            throw new InvalidUserFormatException("ID가 형식에 맞지 않습니다.");
        }
        if (!UserValidate.isUserPasswordValid(user.getUserPassword())) {
            log.error("사용자 비밀번호 유효성 검증 실패: {}", user.getUserId());
            throw new InvalidUserFormatException("비밀번호가 형식에 맞지 않습니다.");
        }
        if (isUserIdDuplicated(user.getUserId())) {
            log.error("사용자 ID 중복 : {}", user.getUserId());
            throw new UserIdAlreadyExistException("이미 존재하는 ID입니다.");
        }
    }

    public boolean isUserIdDuplicated(String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.isPresent();
    }

    public void authenticate(LoginRequest loginRequest) {
        String userId = loginRequest.getUserId();
        String userPassword = loginRequest.getUserPassword();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.error("해당 유저가 존재하지 않습니다.: {}", userId);
                    return new UserNotFoundException("해당 유저가 존재하지 않습니다.");
                });

        if (!Objects.equals(user.getUserPassword(), userPassword)){
            log.warn("로그인 실패: {}", userId);
            throw new InvalidCredentialException("아이디나 비밀번호가 맞지 않습니다.");
        }
    }

    public void addLoginSession(LoginRequest loginRequest, HttpSession session) {
        session.setMaxInactiveInterval(32400); //9시간
        session.setAttribute("userId", loginRequest.getUserId());
    }

    public void isLoginRequestNotExists(LoginRequest loginRequest) {
        if (loginRequest == null){
            log.warn("로그인 실패: 로그인 데이터가 없습니다.");
            throw new InvalidCredentialException("로그인 데이터가 없습니다.");
        }
        log.info("로그인 시도");
    }


}
