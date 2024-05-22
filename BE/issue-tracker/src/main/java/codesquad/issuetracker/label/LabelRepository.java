package codesquad.issuetracker.label;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepository extends CrudRepository<Label, Long> {

    Page<Label> findAll(Pageable pageable);

    @Query("SELECT COUNT(*) FROM LABEL WHERE IS_DELETED = FALSE")
    Long countLabels();
}
