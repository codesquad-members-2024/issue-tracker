package com.CodeSquad.IssueTracker.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

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
        return userOptional.isPresent() && Objects.equals(userOptional.get().getUserPassword(), userPassword);
    }
}
