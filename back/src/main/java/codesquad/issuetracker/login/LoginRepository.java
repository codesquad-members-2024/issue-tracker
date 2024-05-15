package codesquad.issuetracker.login;

import codesquad.issuetracker.user.User;
import org.springframework.data.repository.CrudRepository;

public interface LoginRepository extends CrudRepository<User, String> {
    User findByLoginId(String loginId);
}
