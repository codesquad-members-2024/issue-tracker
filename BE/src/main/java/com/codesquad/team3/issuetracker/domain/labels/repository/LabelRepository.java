package com.codesquad.team3.issuetracker.domain.labels.repository;

import com.codesquad.team3.issuetracker.domain.labels.entity.Label;
import com.codesquad.team3.issuetracker.support.repository.SimpleCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepository extends SimpleCrudRepository<Label, Integer> {

}
