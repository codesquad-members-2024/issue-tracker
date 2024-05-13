package codesquad.issuetracker.issue;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IssueRepository extends CrudRepository<Issue, Long> {

    @Query("SELECT * FROM issue")
    List<Issue> findAllIssues();
}
