package codesquad.issuetracker.issue;

import java.util.List;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueRepository extends CrudRepository<Issue, Long> {

    List<Issue> findAllByIsOpen(boolean isOpen);

    @Query("SELECT * FROM ISSUE JOIN ISSUE_LABEL ON ISSUE.ID = ISSUE_LABEL.ISSUE_ID WHERE ISSUE_LABEL.LABEL_ID = :labelId")
    List<Issue> findAllByLabelId(@Param("labelId") Long labelId);

    List<Issue> findByMilestoneId(Long milestoneId);

}
