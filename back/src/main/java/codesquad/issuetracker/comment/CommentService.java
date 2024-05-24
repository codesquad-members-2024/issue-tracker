package codesquad.issuetracker.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment updateCommentById(Long commentId, String newContent) {
        commentRepository.updateById(commentId, newContent);
        return commentRepository.findById(commentId).get();
    }
}
