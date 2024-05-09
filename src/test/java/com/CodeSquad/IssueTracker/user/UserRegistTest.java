package com.CodeSquad.IssueTracker.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserRegistTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    private User validUser;
    private User invalidUser;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // Mockito 어노테이션 초기화
        validUser = new User("validId", "validPW", "validN");
        invalidUser = new User("short", "123", "n");
    }

    @Test
    @DisplayName("유효한 사용자 정보 테스트")
    public void testSaveSuccess() {
        boolean result = userService.save(validUser);
        assertTrue(result);
    }

    @Test
    @DisplayName("유효하지 않은 사용자 정보 테스트")
    public void testSaveFail() {
        boolean result = userService.save(invalidUser);
        assertFalse(result);
    }

    @Test
    @DisplayName("사용자 ID 중복 확인 - 중복")
    public void testGetValidationIdDuplicated() throws Exception {
        when(userService.isUserIdDuplicated("duplicatedId")).thenReturn(true);

        mockMvc.perform(get("/get/validation/{id}", "duplicatedId"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("사용자 ID 중복 확인 - 중복 아님")
    public void testGetValidationIdNotDuplicated() throws Exception {
        when(userService.isUserIdDuplicated("uniqueId")).thenReturn(false);

        mockMvc.perform(get("/get/validation/{id}", "uniqueId"))
                .andExpect(status().isOk());
    }
    @Test
    @DisplayName("사용자 ID가 null인 경우")
    public void testUserIdNull() {
        User user = new User(null, "validPW", "validN");
        boolean result = userService.save(user);
        assertFalse(result);
    }

    @Test
    @DisplayName("사용자 비밀번호가 null인 경우")
    public void testUserPasswordNull() {
        User user = new User("validId", null, "validN");
        boolean result = userService.save(user);
        assertFalse(result);
    }

    @Test
    @DisplayName("사용자 닉네임이 null인 경우")
    public void testUserNicknameNull() {
        User user = new User("validId", "validPW", null);
        boolean result = userService.save(user);
        assertFalse(result);
    }

}