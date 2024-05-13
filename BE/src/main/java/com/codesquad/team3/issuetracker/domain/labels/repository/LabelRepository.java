package com.codesquad.team3.issuetracker.domain.labels.repository;

import com.codesquad.team3.issuetracker.domain.labels.entity.Label;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepository extends CrudRepository<Label, String> {

    @Modifying
    @Query("UPDATE LABEL SET title =:newTitle, " +
            "description =:description, " +
            "color =:color where title =:title")
    void updateByTitle(
            @Param("title") String title,
            @Param("description") String description,
            @Param("color") String color,
            @Param("newTitle") String newTitle);


}
