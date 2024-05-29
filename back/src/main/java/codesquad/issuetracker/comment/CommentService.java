package codesquad.issuetracker.comment;

import codesquad.issuetracker.exception.CommentNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private static final String COMMENT_NOT_FOUND_ERROR_MESSAGE = "존재하지 않는 댓글 입니다.";

    private final CommentRepository commentRepository;

    public Comment createComment(CommentServiceDto commentServiceDto) {
        return commentRepository.save(
                new Comment(commentServiceDto.getContent(),
                        commentServiceDto.getLoginId(),
                        commentServiceDto.getIssueId(),
                        commentServiceDto.getCreatedDate())
        );
    }

    public Comment updateCommentById(Long commentId, String newContent) {
        commentRepository.updateById(commentId, newContent);
        return commentRepository.findById(commentId).orElseThrow(() -> new CommentNotFoundException(COMMENT_NOT_FOUND_ERROR_MESSAGE));
    }
}
