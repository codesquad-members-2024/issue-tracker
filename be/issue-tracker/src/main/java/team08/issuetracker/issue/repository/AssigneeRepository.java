package team08.issuetracker.issue.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import team08.issuetracker.issue.ref.Assignee;

@Repository
public interface AssigneeRepository extends CrudRepository<Assignee, Long> {
}
