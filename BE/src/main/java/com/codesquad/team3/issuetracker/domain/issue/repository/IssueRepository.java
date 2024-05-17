package com.codesquad.team3.issuetracker.domain.issue.repository;

import com.codesquad.team3.issuetracker.domain.issue.entity.Issue;
import com.codesquad.team3.issuetracker.support.repository.OpenCloseCrudRepository;
import com.codesquad.team3.issuetracker.support.repository.SoftDeleteCrudRepository;

public interface IssueRepository extends SoftDeleteCrudRepository<Issue, Integer>, OpenCloseCrudRepository<Issue, Integer> {
}
