package codesquad.issuetracker.user;

import codesquad.issuetracker.exception.UserAlreadyExist;
import codesquad.issuetracker.user.dto.UserCreateRequest;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findById(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.orElseThrow(IllegalArgumentException::new);
    }

    public String register(UserCreateRequest request) {
        User user = User.builder()
            .id(request.getId())
            .username(request.getUsername())
            .password(request.getPassword())
            .role(request.getRole())
            .build();

        checkUserIdDuplicate(user.getId());
        User savedUser = userRepository.save(user);
        return savedUser.getId();
    }

    public void checkUserIdDuplicate(String id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            throw new UserAlreadyExist();
        }
    }
}
