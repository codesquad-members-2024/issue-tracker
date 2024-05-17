package codesquad.issuetracker.comment;

import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment addComment(Long issueId, CommentCreateRequest commentCreateRequest) {
        Comment comment = Comment.of(issueId, commentCreateRequest);
        return commentRepository.save(comment);
    }
}
