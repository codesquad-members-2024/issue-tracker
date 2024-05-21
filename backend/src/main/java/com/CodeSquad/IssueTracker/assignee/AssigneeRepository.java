package com.CodeSquad.IssueTracker.assignee;

import com.CodeSquad.IssueTracker.assignee.dto.AssigneeResponse;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface AssigneeRepository extends CrudRepository<Assignee, Long> {

    @Query("SELECT user_id FROM assignees WHERE issue_id = :issueId")
    List<AssigneeResponse> findUsersByIssueId(Long issueId);

    @Query("SELECT * FROM assignees WHERE issue_id = :issueId AND user_id = :userId")
    Optional<Assignee> findByIssueIdAndUserId(Long issueId, String userId);

    @Modifying
    @Query("DELETE FROM assignees WHERE issue_id = :issueId AND user_id = :userId")
    void deleteByIssueIdAndUserId(Long issueId, String userId);
}
