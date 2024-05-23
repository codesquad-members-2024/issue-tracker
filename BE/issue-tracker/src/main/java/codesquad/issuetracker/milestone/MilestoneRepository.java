package codesquad.issuetracker.milestone;

import codesquad.issuetracker.global.repository.CustomCrudRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MilestoneRepository extends CrudRepository<Milestone, Long>, MilestoneCustomRepository,
    CustomCrudRepository<Milestone, Long> {

    Page<Milestone> findAll(Pageable pageable);

    @Modifying
    @Query("UPDATE MILESTONE m SET m.state = :state WHERE m.id = :id")
    int updateMilestoneState(@Param("id") Long id, @Param("state") String state);

    @Query("SELECT COUNT(*) FROM MILESTONE WHERE IS_DELETED = FALSE AND STATE = 'OPEN'")
    int countOpenMilestones();

}
