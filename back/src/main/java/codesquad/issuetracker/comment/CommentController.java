package codesquad.issuetracker.comment;

import codesquad.issuetracker.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/comments")
    public ResponseEntity<CommentShowDto> createComment(
            @RequestBody Comment comment,
            UriComponentsBuilder uriComponentsBuilder,
            @SessionAttribute(name = "LOGIN USER", required = false) User user
    ) {
        comment.setLoginId(user.getLoginId());
        Comment createdComment = commentService.createComment(comment);
        URI location = uriComponentsBuilder.path("/comments/{id}")
                .buildAndExpand(createdComment.getId())
                .toUri();
        return ResponseEntity
                .created(location)
                .body(new CommentShowDto(createdComment));
    }

    @PutMapping("/comments/{commentId}")
    public ResponseEntity<CommentShowDto> updateCommentById(@PathVariable Long commentId, @RequestBody CommentUpdateDto commentUpdateDto) {
        Comment updatedComment = commentService.updateCommentById(commentId, commentUpdateDto.getContent());
        return ResponseEntity.ok(new CommentShowDto(updatedComment));
    }
}
