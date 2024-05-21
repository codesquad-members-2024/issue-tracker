package codesquad.issuetracker.milestone;

import java.time.LocalDateTime;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MilestoneRepository extends CrudRepository<Milestone, Long> {

    @Modifying
    @Query("UPDATE MILESTONE m SET m.title = :title, m.description = :description, m.DUE_DATE = :dueDate WHERE m.id = :id")
    int updateMilestone(@Param("id") Long id, @Param("title") String title,
        @Param("description") String description, @Param("dueDate") LocalDateTime dueDate);

    @Modifying
    @Query("UPDATE MILESTONE m SET m.state = :state WHERE m.id = :id")
    int updateMilestoneState(@Param("id") Long id, @Param("state") String state);

    @Query("SELECT COUNT(*) FROM MILESTONE WHERE IS_DELETED = FALSE AND STATE = 'OPEN'")
    Long countOpenMilestones();

}
