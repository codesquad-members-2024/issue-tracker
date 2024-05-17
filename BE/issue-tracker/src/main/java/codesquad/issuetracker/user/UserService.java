package codesquad.issuetracker.user;

import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findById(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.orElseThrow(IllegalArgumentException::new);
    }
}
