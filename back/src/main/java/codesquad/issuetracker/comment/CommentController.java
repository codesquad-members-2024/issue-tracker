package codesquad.issuetracker.comment;

import jakarta.servlet.http.HttpServletRequest;
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
            @RequestBody CommentSaveDto commentSaveDto,
            UriComponentsBuilder uriComponentsBuilder,
            HttpServletRequest request
    ) {
        commentSaveDto.setLoginId((String) request.getAttribute("loginId")); // HttpServletRequest에 저장한 "loginId" 값 사용, 현재 로그인 한 사용자 id
        Comment createdComment = commentService.createComment(commentSaveDto.toServiceDto());
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
