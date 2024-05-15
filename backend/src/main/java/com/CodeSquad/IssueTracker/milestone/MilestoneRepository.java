package com.CodeSquad.IssueTracker.milestone;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MilestoneRepository extends CrudRepository<Milestone, Long> {
}
