package team08.issuetracker.issue.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import team08.issuetracker.issue.model.Issue;

@Repository
public interface IssueRepository extends CrudRepository<Issue, Long> {
}