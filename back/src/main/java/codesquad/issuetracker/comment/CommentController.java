package codesquad.issuetracker.comment;

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
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment, UriComponentsBuilder uriComponentsBuilder) {
        Comment createdComment = commentService.createComment(comment);
        URI location = uriComponentsBuilder.path("/comments/{id}")
                .buildAndExpand(createdComment.getId())
                .toUri();
        return ResponseEntity
                .created(location)
                .body(createdComment);
    }

    @PutMapping("/comments/{commentId}")
    public ResponseEntity<Comment> updateCommentById(@PathVariable Long commentId, @RequestBody CommentUpdateDto commentUpdateDto) {
        Comment updatedComment = commentService.updateCommentById(commentId, commentUpdateDto.getContent());
        return ResponseEntity.ok(updatedComment);
    }
}
