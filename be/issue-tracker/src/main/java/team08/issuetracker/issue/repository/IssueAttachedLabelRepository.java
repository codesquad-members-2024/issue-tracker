package team08.issuetracker.issue.repository;

import org.springframework.data.repository.CrudRepository;
import team08.issuetracker.issue.ref.IssueAttachedLabel;

public interface IssueAttachedLabelRepository extends CrudRepository<IssueAttachedLabel, Long> {
}
