package codesquad.issuetracker.user;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, String> {
    User findByLoginId(String loginId);

    List<User> findAll();

    List<User> findAllById(Iterable<String> ids);
}
