package team08.issuetracker.comment.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team08.issuetracker.comment.model.Comment;
import team08.issuetracker.comment.model.dto.CommentCreationRequest;
import team08.issuetracker.comment.model.dto.CommentCreationResponse;
import team08.issuetracker.comment.model.dto.CommentUpdateRequest;
import team08.issuetracker.comment.model.dto.CommentUpdateResponse;
import team08.issuetracker.comment.service.CommentService;

@RestController
@RequestMapping("/issue/{issueId}/comment")
@Slf4j
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentCreationResponse> createComment(@PathVariable long issueId, @RequestBody CommentCreationRequest commentCreationRequest) {
        commentCreationRequest.setIssueId(issueId); // url 경로서 이슈 아이디 떼어와 세팅하기
        Comment createdComment = commentService.createComment(commentCreationRequest); // DTO -> Entity 변환해서 Repository 에 저장하는 건 service 레이어에서

        CommentCreationResponse response = CommentCreationResponse.from(createdComment);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("{id}")
    public ResponseEntity<CommentUpdateResponse> updateComment(@PathVariable long issueId, @PathVariable long id, @RequestBody CommentUpdateRequest commentUpdateRequest) {
        Comment updatedComment = commentService.updateComment(issueId, id, commentUpdateRequest);

        CommentUpdateResponse response = CommentUpdateResponse.from(updatedComment);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }

}
