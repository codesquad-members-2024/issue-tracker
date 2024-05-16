package codesquad.issuetracker.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public void createComment(Comment comment) {
        commentRepository.save(comment);
    }

    public void updateCommentById(Long commentId, String newContent) {
        commentRepository.updateById(commentId, newContent);
    }
}
