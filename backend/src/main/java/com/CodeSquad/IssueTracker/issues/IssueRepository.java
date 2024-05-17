package com.CodeSquad.IssueTracker.issues;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends CrudRepository<Issue, Long> {

    @Query("SELECT * FROM issues WHERE is_closed = false ORDER BY issue_id DESC LIMIT :limit OFFSET :offset")
    List<Issue> findOpenIssues(long limit, long offset);

    @Query("SELECT * FROM issues WHERE is_closed = true ORDER BY issue_id DESC LIMIT :limit OFFSET :offset")
    List<Issue> findCloseIssues(long limit, long offset);

    @Query("SELECT COUNT(issue_id) FROM issues WHERE is_closed = false")
    long countOpenIssues();

    @Query("SELECT COUNT(issue_id) FROM issues WHERE is_closed = true")
    long countCloseIssues();

    @Modifying
    @Query("UPDATE milestone SET total_issue = total_issue + 1 WHERE milestone_id = :milestoneId")
    void incrementIssueCountForMilestone(Long milestoneId);

    @Modifying
    @Query("UPDATE milestone SET closed_issue = closed_issue + 1 WHERE milestone_id = :milestoneId")
    void incrementClosedIssueCountForMilestone(Long milestoneId);

    @Modifying
    @Query("UPDATE milestone SET closed_issue = closed_issue - 1 WHERE milestone_id = :milestoneId")
    void decrementClosedIssueCountForMilestone(Long milestoneId);
}
