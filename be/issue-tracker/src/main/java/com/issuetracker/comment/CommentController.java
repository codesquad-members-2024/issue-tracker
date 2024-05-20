package com.issuetracker.comment;

import com.issuetracker.comment.dto.CommentCreateRequest;
import com.issuetracker.comment.dto.CommentDetailDto;
import com.issuetracker.comment.service.CommentService;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/comments")
@RequiredArgsConstructor
@RestController
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentDetailDto> createComment(
            @Valid @RequestBody CommentCreateRequest commentCreateRequest) {
        CommentDetailDto commentDetailDto = commentService.createComment(commentCreateRequest);

        URI location = URI.create(String.format("/api/comments/%s", commentDetailDto.getId()));
        return ResponseEntity.created(location).body(commentDetailDto);
    }
}
