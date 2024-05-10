package com.codesquad.team3.issuetracker.domain.labels.repository;

import com.codesquad.team3.issuetracker.domain.labels.dto.Label;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepository extends CrudRepository<Label, Long> {


    public Label save(Label label);
    public Label update(Long id, Label label);
    public void delete(Long id);
    Label get(Long id);
}
