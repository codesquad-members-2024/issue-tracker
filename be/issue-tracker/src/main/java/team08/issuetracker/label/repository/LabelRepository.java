package team08.issuetracker.label.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import team08.issuetracker.label.model.Label;

import java.util.List;

@Repository
public interface LabelRepository extends CrudRepository<Label, Long> {

    @Query("SELECT COUNT(*) FROM label")
    long countLabels();

    @Query("SELECT * FROM label")
    List<Label> getAllLabels();
}
