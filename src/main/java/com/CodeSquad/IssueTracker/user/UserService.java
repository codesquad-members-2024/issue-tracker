package com.CodeSquad.IssueTracker.user;

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
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public void save(User user){
        userRepository.save(user);
    }

    public boolean authenticate(String userId, String userPassword) {
        Optional<User> userOptional = userRepository.findUserById(userId);

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
