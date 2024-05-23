package codesquad.issuetracker.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<UserShowDto>> getAllUsers() {
        List<User> allUsers = userService.getAllUsers();
        List<UserShowDto> allUserShowDto = allUsers.stream()
                .map(user -> new UserShowDto(user))
                .collect(Collectors.toList());
        return ResponseEntity.ok(allUserShowDto);
    }
}
