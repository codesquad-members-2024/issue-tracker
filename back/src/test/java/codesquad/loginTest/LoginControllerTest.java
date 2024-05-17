package codesquad.loginTest;

import codesquad.issuetracker.login.LoginController;
import codesquad.issuetracker.login.LoginForm;
import codesquad.issuetracker.login.LoginService;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;


public class LoginControllerTest {

    @Mock
    private LoginService loginService;

    @Mock
    private HttpSession session;

    @Mock
    private BindingResult bindingResult;

    @InjectMocks
    private LoginController loginController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testLoginSuccess() {
        // given
        String email = "test@example.com";
        String password = "password123";
        LoginForm loginForm = new LoginForm();
        loginForm.setEmail(email);
        loginForm.setPassword(password);

        when(bindingResult.hasErrors()).thenReturn(false);
        when(loginService.authenticate(email, password, session)).thenReturn(true);

        // when
        ResponseEntity<Map<String, String>> response = loginController.login(loginForm, bindingResult, session);

        // then
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("로그인 성공", response.getBody().get("message"));
    }

    @Test
    public void testLoginFailure() {
        // given
        String email = "test@example.com";
        String password = "wrongpassword";
        LoginForm loginForm = new LoginForm();
        loginForm.setEmail(email);
        loginForm.setPassword(password);

        when(bindingResult.hasErrors()).thenReturn(false);
        when(loginService.authenticate(email, password, session)).thenReturn(false);

        // when
        ResponseEntity<Map<String, String>> response = loginController.login(loginForm, bindingResult, session);

        // then
        assertEquals(401, response.getStatusCodeValue());
        assertEquals("잘못된 로그인 정보 입니다.", response.getBody().get("message"));
    }

}

