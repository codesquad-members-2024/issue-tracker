package codesquad.issuetracker.login;

import codesquad.issuetracker.user.User;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final LoginRepository loginRepository;

    public boolean authenticate(String email, String password, HttpSession session) {
        User user = loginRepository.findByLoginId(email);
        if (user != null && user.getPassword().equals(password)) {
            session.setAttribute("로그인 사용자", user);
            return true;
        }
        return false;
    }
}
