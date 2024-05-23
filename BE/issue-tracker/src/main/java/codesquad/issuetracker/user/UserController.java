package codesquad.issuetracker.user;

import codesquad.issuetracker.user.dto.UserCreateRequest;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserCreateRequest request) {
        String userId = userService.register(request);
        return ResponseEntity.created(URI.create("/api/users/" + userId)).build();
    }

    @GetMapping("/checkUserId/{userId}")
    public ResponseEntity<?> checkUserIdDuplication(@PathVariable String userId) {
        userService.checkUserIdDuplicate(userId);
        return ResponseEntity.ok().build();
    }

}
