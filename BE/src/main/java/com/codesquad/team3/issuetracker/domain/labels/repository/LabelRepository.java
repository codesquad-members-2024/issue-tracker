package com.codesquad.team3.issuetracker.domain.labels.repository;

import com.codesquad.team3.issuetracker.domain.labels.entity.Label;
import com.codesquad.team3.issuetracker.support.repository.GlobalCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepository extends GlobalCrudRepository<Label, String> {

}
