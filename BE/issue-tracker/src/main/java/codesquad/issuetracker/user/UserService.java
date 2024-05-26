package codesquad.issuetracker.user;

import codesquad.issuetracker.exception.UserAlreadyExist;
import codesquad.issuetracker.exception.UserNotFoundException;
import codesquad.issuetracker.user.dto.UserCreateRequest;
import codesquad.issuetracker.user.dto.UserLoginRequest;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    public UserService(JwtTokenProvider jwtTokenProvider, UserRepository userRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
    }

    public String login(UserLoginRequest userLoginRequest) {
        verifyUserExists(userLoginRequest.getId());
        verifyPassword(userLoginRequest.getId(), userLoginRequest.getPassword());
        return jwtTokenProvider.createAccessToken(userLoginRequest.getId());
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

    private void verifyUserExists(String id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException();
        }
    }

    public void verifyDuplicateUserId(String id) {
        if (userRepository.existsById(id)) {
            throw new UserAlreadyExist();
        }
    }

    private void verifyPassword(String id, String password) {
        User user = findById(id);
        String hashedPassword = hashPassword(password);
        user.verifyPassword(hashedPassword);
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
