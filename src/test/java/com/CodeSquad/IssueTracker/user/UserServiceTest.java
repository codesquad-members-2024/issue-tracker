package com.CodeSquad.IssueTracker.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.any;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User validUser;
    private User invalidUser;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // Mockito 어노테이션 초기화
        validUser = new User("validId", "validPW", "validN");
        invalidUser = new User("short", "123", "n");
    }

    @DisplayName("유효한 사용자 정보 테스트")
    @Test
    public void testSaveSuccess() {
        boolean result = userService.save(validUser);
        assertTrue(result);
    }

    @DisplayName("유효하지 않은 사용자 정보 테스트")
    @Test
    public void testSaveFail() {
        boolean result = userService.save(invalidUser);
        assertFalse(result);
    }
}
