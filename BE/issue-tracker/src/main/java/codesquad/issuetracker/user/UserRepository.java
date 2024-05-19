package codesquad.issuetracker.user;

import java.util.Optional;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

    @Query("SELECT * FROM USERS WHERE USERS.id = :id")
    @Override
    Optional<User> findById(@Param("id") String id);
}
