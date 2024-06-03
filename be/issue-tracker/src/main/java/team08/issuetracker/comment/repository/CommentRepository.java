package team08.issuetracker.comment.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import team08.issuetracker.comment.model.Comment;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
    List<Comment> findByIssueId(Long issueId);
    Optional<Comment> findByIdAndIssueId(Long id, Long issueId);
}
