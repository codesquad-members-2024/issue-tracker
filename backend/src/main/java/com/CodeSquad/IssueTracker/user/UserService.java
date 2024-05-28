package com.CodeSquad.IssueTracker.user;
import com.CodeSquad.IssueTracker.Exception.user.InvalidCredentialException;
import com.CodeSquad.IssueTracker.Exception.user.UserIdAlreadyExistException;
import com.CodeSquad.IssueTracker.Exception.user.UserNotFoundException;
import com.CodeSquad.IssueTracker.user.dto.LoginRequest;
import com.CodeSquad.IssueTracker.user.dto.UserRegisterRequest;
import com.CodeSquad.IssueTracker.user.utils.SHA256Util;
import com.CodeSquad.IssueTracker.user.jwtlogin.JwtUtil;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }



    public void save(UserRegisterRequest userRegisterRequest) {
        User user = User.builder()
                .userId(userRegisterRequest.userId())
                .userPassword(SHA256Util.getSaltedHash(userRegisterRequest.userPassword()))
                .isNew(true)
                .build();
        verifyUserInfo(user);
        userRepository.save(user);
    }

    public void verifyUserInfo(User user) {
        if (isUserIdDuplicated(user.getUserId())) {
            log.error("회원가입 사용자 ID 중복 : {}", user.getUserId());
            throw new UserIdAlreadyExistException("이미 존재하는 ID입니다.");
        }
    }

    public boolean isUserIdDuplicated(String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.isPresent();
    }

//    public void authenticate(LoginRequest loginRequest) {
//        String userId = loginRequest.getUserId();
//        String userPassword = loginRequest.getUserPassword();
//
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> {
//                    log.error("해당 유저가 존재하지 않습니다.: {}", userId);
//                    return new UserNotFoundException("해당 유저가 존재하지 않습니다.");
//                });
//
//        if (!Objects.equals(user.getUserPassword(), userPassword)){
//            log.warn("로그인 실패: {}", userId);
//            throw new InvalidCredentialException("아이디나 비밀번호가 맞지 않습니다.");
//        }
//    }



//    @Value("${server.servlet.session.timeout}")
//    private int sessionTimeout;

//    public void addLoginSession(LoginRequest loginRequest, HttpSession session) {
//        session.setMaxInactiveInterval(sessionTimeout);
//        session.setAttribute("userId", loginRequest.getUserId());
//    }
//
//    public void isLoginRequestNotExists(LoginRequest loginRequest) {
//        if (loginRequest == null){
//            log.warn("로그인 실패: 로그인 데이터가 없습니다.");
//            throw new InvalidCredentialException("로그인 데이터가 없습니다.");
//        }
//        log.info("로그인 시도");
//    }

    public String authenticate(LoginRequest loginRequest) {
        String loginId = loginRequest.getUserId();
        String loginPassword = loginRequest.getUserPassword();

        User userInfo = userRepository.findById(loginId)
                .orElseThrow(() -> {
                    log.error("해당 유저가 존재하지 않습니다.: {}", loginId);
                    return new UserNotFoundException("해당 유저가 존재하지 않습니다.");
                });

        if (!SHA256Util.verify(loginPassword, userInfo.getUserPassword())) {
            log.warn("로그인 실패: {}", loginId);
            throw new InvalidCredentialException("아이디나 비밀번호가 맞지 않습니다.");
        }

        return jwtUtil.generateToken(loginId);
    }



    public void validateExistUser(String userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.info("인증 실패 : 존재하지 않는 유저입니다. userId : {}", userId);
                    return new UserNotFoundException("해당 유저가 존재하지 않습니다.");
                });
    }


    public List<String> getAllUserIds() {
        return userRepository.getAllUserIds();
    }

    public Set<User> findAllByIds(Set<String> newAssigneeIds) {
        return userRepository.findAllById(newAssigneeIds);
    }
}
