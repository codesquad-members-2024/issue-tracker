package team08.issuetracker.comment.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team08.issuetracker.comment.model.Comment;
import team08.issuetracker.comment.model.dto.CommentCreationRequest;
import team08.issuetracker.comment.service.CommentService;

@RestController // ResponseBody + Controller
@RequestMapping("/issue/{issueId}/comment")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> createComment(@PathVariable long issueId, @RequestBody CommentCreationRequest commentCreationRequest) {
        commentCreationRequest.setIssueId(issueId);
        Comment createdComment = commentService.createComment(commentCreationRequest);;
        return ResponseEntity.ok(createdComment);
    }



}
