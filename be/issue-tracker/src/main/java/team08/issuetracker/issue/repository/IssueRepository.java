package team08.issuetracker.issue.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team08.issuetracker.issue.model.Issue;

@Repository
public interface IssueRepository extends CrudRepository<Issue, Long> {

    @Query("SELECT COUNT(*) FROM issue WHERE is_open = true AND milestone_id = :milestoneId")
    long countOpenedIssuesByMilestoneId(@Param("milestoneId") long milestoneId);

    @Query("SELECT COUNT(*) FROM issue WHERE is_open = false AND milestone_id = :milestoneId")
    long countClosedIssuesByMilestoneId(@Param("milestoneId") long milestoneId);
}
