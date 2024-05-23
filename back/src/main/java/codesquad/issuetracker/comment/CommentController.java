package codesquad.issuetracker.comment;

import codesquad.issuetracker.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/comments")
    public void createComment(
            @RequestBody Comment comment,
            @SessionAttribute(name = "LOGIN USER", required = false) User user
    ) {
        comment.setLoginId(user.getLoginId());
        commentService.createComment(comment);
    }

    @PutMapping("/comments/{commentId}")
    public void updateCommentById(@PathVariable Long commentId, @RequestBody CommentUpdateDto commentUpdateDto) {
        commentService.updateCommentById(commentId, commentUpdateDto.getContent());
    }
}
