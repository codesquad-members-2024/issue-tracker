package com.codesquad.team3.issuetracker.domain.milestone.repository;

import com.codesquad.team3.issuetracker.domain.milestone.entity.Milestone;
import com.codesquad.team3.issuetracker.support.repository.OpenCloseCrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MilestoneRepository extends OpenCloseCrudRepository<Milestone, Integer> {

}
