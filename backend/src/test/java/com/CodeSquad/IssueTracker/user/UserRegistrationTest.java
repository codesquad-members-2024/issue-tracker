package com.CodeSquad.IssueTracker.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

public class UserRegistrationTest {

    @Mock
    private UserRepository userRepository;

    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        userService = new UserService(userRepository);
    }

    @Test
    @DisplayName("유효한 사용자의 회원가입")
    public void testSaveValidUser() {
        User user = new User("validU", "vidPas", "valame");
        assertTrue(userService.save(user));
    }


    @Test
    @DisplayName("유효하지 않은 사용자의 가입")
    public void testSaveInvalidUser() {
        User user = new User("invalidUser", "invalidPassword", "invalidNickname");
        assertFalse(userService.save(user));
    }

    @Test
    @DisplayName("중복된 ID가 있을 때")
    public void testIsUserIdDuplicated() {
        String userId = "existingUserId";
        User user = new User(userId, "invalidPassword", "invalidNickname");
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        assertTrue(userService.isUserIdDuplicated(userId));
    }

    @Test
    @DisplayName("중복된 ID가 없을 때")
    public void testIsUserIdNotDuplicated() {
        String existId = "existingUserId";
        User user = new User(existId, "invalidPassword", "invalidNickname");

        String userId = "newUserId";
        when(userRepository.findById(existId)).thenReturn(Optional.of(user));
        assertFalse(userService.isUserIdDuplicated(userId));
    }
}