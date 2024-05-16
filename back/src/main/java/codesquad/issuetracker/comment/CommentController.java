package codesquad.issuetracker.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/comments")
    public void createComment(@RequestBody Comment comment) {
        commentService.createComment(comment);
    }

    @PutMapping("/comments/{commentId}")
    public void updateCommentById(@PathVariable Long commentId, @RequestBody CommentContentDto contentDto) {
        commentService.updateCommentById(commentId, contentDto.getContent());
    }
}
