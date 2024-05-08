package com.CodeSquad.IssueTracker.user;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public boolean save(User user){
        log.info("사용자 저장 시도: {}", user.getUserId());

        if(userRepository.existsByUserID(user.getUserId())){
            log.error("사용자 ID 중복: {}", user.getUserId());

            return false;
        }
        if (verifyUserInfo(user)) {
            userRepository.save(user);
            log.info("사용자 저장 성공: {}", user.getUserId());

            return true;
        }
        else{
            log.error("사용자 정보 검증 실패: {}", user.getUserId());

            return false;
        }
    }

    private boolean verifyUserInfo(User user){
        if(!isLengthVaild(user.getUserId(), 6, 16)){
            log.error("사용자 ID 길이가 유효하지 않음: {}", user.getUserId());

            return false;
        }
        if(!isLengthVaild(user.getUserPassword(), 6 , 12)){
            log.error("사용자 비밀번호 길이가 유효하지 않음: {}", user.getUserId());

            return false;
        }
        if(!isLengthVaild(user.getUserNickname(), 2, 6)){
            log.error("사용자 닉네임 길이가 유효하지 않음: {}", user.getUserId());

            return false;
        }

        return true;
    }

    private boolean isLengthVaild(String field, int min, int max){

        return field.length() >= min && field.length() <= max;
    }
}