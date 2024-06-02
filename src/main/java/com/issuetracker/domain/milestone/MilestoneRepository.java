package com.issuetracker.domain.milestone;

import com.issuetracker.domain.milestone.request.MilestoneUpdateRequest;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MilestoneRepository extends CrudRepository<Milestone, String> {

    List<Milestone> findMilestonesByIsOpenOrderByCreatedAtDesc(boolean openStatus);

    Long countByIsOpen(boolean openStatus);

    @Modifying
    @Query("UPDATE MILESTONE SET IS_OPEN = :desiredState WHERE MILESTONE_ID = :milestoneId")
    void updateOpenStatus(String milestoneId, boolean desiredState);


    @Modifying
    @Query("UPDATE MILESTONE SET MILESTONE_ID = :#{#form.id}, DUE_DATE = :#{#form.dueDate}, DESCRIPTION = :#{#form.description} " +
            "WHERE MILESTONE_ID = :milestoneId")
    void updateMilestoneBy(String milestoneId, MilestoneUpdateRequest form);

    @Query("select IS_OPEN from ISSUE where MILESTONE_ID = :milestoneId;")
    List<Integer> getIssueMetric(String milestoneId);
}
