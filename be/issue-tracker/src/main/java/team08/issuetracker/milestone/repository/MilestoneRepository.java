package team08.issuetracker.milestone.repository;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import team08.issuetracker.milestone.model.Milestone;

import java.util.List;

@Repository
public interface MilestoneRepository extends ListCrudRepository<Milestone, Long> {

    @Query("SELECT COUNT(*) FROM milestone WHERE is_open = true")
    long countOpenedMilestones();

    @Query("SELECT COUNT(*) FROM milestone WHERE is_open = false")
    long countClosedMilestones();

    @Query("SELECT * FROM milestone WHERE is_open = true")
    List<Milestone> getAllOpenedMilestone();

    @Query("SELECT * FROM milestone WHERE is_open = false")
    List<Milestone> getAllClosedMilestone();


}
