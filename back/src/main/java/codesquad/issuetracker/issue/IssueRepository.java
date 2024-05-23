package codesquad.issuetracker.issue;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IssueRepository extends CrudRepository<Issue, Long> {

    List<Issue> findAll();

    @Modifying
    @Query("update issue set title = :newTitle where id = :issueId")
    void updateTitleById(Long issueId, String newTitle);

    @Modifying
    @Query("update issue set content = :newContent where id = :issueId")
    void updateContentById(Long issueId, String newContent);
}
