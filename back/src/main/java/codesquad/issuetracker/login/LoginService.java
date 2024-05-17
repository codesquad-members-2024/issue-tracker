package codesquad.issuetracker.login;

import codesquad.issuetracker.user.User;
import codesquad.issuetracker.user.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;

    public boolean authenticate(String email, String password, HttpSession session) {
        User user = userRepository.findByLoginId(email);
        if (user != null && user.getPassword().equals(password)) {
            session.setAttribute("LOGIN USER", user);
            return true;
        }
        return false;
    }
}
