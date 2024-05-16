package codesquad.loginTest;

import codesquad.issuetracker.login.LoginRepository;
import codesquad.issuetracker.login.LoginService;
import codesquad.issuetracker.user.User;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

public class LoginServiceTest {

    @Mock
    private LoginRepository loginRepository;

    @Mock
    private HttpSession session;

    @InjectMocks
    private LoginService loginService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAuthenticateSuccess() {
        // given
        String email = "test@example.com";
        String password = "password123";
        User user = new User(email, password, "profile.jpg");

        when(loginRepository.findByLoginId(email)).thenReturn(user);

        // when
        boolean result = loginService.authenticate(email, password, session);

        // then
        assertTrue(result);
    }

    @Test
    public void testAuthenticateFailure() {
        // given
        String email = "test@example.com";
        String password = "wrongpassword";

        when(loginRepository.findByLoginId(email)).thenReturn(null);

        // when
        boolean result = loginService.authenticate(email, password, session);

        // then
        assertFalse(result);
    }
}
