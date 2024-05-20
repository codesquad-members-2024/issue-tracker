package com.CodeSquad.IssueTracker.issues.comment;


import com.CodeSquad.IssueTracker.issues.comment.dto.CommentCreateRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/issue/{issueId}/comment")
    public ResponseEntity<Void> addComment(@RequestBody CommentCreateRequest request,
                                           @PathVariable("issueId") Long issueId) {
        commentService.addComment(request, issueId);
        return ResponseEntity.ok().build();
    }
}
