package codesquad.issuetracker.user;

import codesquad.issuetracker.exception.UserAlreadyExist;
import codesquad.issuetracker.user.dto.UserCreateRequest;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
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
        String hashedPassword = hashPassword(request.getPassword());

        User user = User.builder()
            .id(request.getId())
            .username(request.getUsername())
            .password(hashedPassword)
            .role(request.getRole())
            .build();

        verifyDuplicateUserId(user.getId());
        userRepository.save(user);
        return user.getId();
    }

    public void verifyDuplicateUserId(String id) {
        if (userRepository.existsById(id)) {
            throw new UserAlreadyExist();
        }
    }
    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(password.getBytes());
            byte[] byteData = md.digest();

            StringBuilder sb = new StringBuilder();
            for (byte b : byteData) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }
}
