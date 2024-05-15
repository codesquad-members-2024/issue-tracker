package com.CodeSquad.IssueTracker.labels;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepository extends CrudRepository<Label, Long> {
}