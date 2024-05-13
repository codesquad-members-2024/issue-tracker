package team08.issuetracker.label.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import team08.issuetracker.label.model.Label;

@Repository
public interface LabelRepository extends CrudRepository<Label, Long> {
}
