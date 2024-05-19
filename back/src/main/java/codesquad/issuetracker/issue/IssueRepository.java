package codesquad.issuetracker.issue;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface IssueRepository extends CrudRepository<Issue, Long> {

    @Modifying
    @Query("update issue set title = :newTitle where id = :issueId")
    void updateTitleById(Long issueId, String newTitle);
}
