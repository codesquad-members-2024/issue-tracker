package codesquad.issuetracker.label;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface LabelRepository extends CrudRepository<Label, Long> {

    @Modifying
    @Query("update label set name = :newName, description = :newDescription, background_color = :newBackgroundColor, text_color = :newTextColor where id = :labelId")
    void updateById(Long labelId, String newName, String newDescription, String newBackgroundColor, String newTextColor);
}