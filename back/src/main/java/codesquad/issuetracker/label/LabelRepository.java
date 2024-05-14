package codesquad.issuetracker.label;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface LabelRepository extends CrudRepository<Label, String> {

    @Modifying
    @Query("insert into label (name, description, color) values (:name, :description, :color)")
    public void insert(String name, String description, String color);
}
