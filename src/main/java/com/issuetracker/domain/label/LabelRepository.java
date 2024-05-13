package com.issuetracker.domain.label;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabelRepository extends CrudRepository<Label, String> {

    @Query("select * from LABEL")
    List<Label> findAllLabels();
}
