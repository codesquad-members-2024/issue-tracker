package team08.issuetracker.comment.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team08.issuetracker.comment.model.Comment;
import team08.issuetracker.comment.model.dto.CommentCreationRequest;
import team08.issuetracker.comment.model.dto.CommentCreationResponse;
import team08.issuetracker.comment.model.dto.CommentUpdateResponse;
import team08.issuetracker.comment.service.CommentService;

@RestController // ResponseBody + Controller
@RequestMapping("/issue/{issueId}/comment")
// 📌 comment 는 특정 이슈 안에서만 존재할 수 있는데, URL path 는 /issue/{issueId} 여야 하나...? */comment 붙여야 하나...?
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentCreationResponse> createComment(@PathVariable long issueId, @RequestBody CommentCreationRequest commentCreationRequest) {
        commentCreationRequest.setIssueId(issueId);
        Comment createdComment = commentService.createComment(commentCreationRequest); // DTO -> Entity 변환해서 Repository 에 저장하는 건 service 레이어에서

        CommentCreationResponse response = CommentCreationResponse.from(createdComment);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("{id}")
    public ResponseEntity<CommentUpdateResponse> updateComment(@PathVariable long issueId, @PathVariable long id, @RequestBody CommentUpdateRequest commentUpdateRequest) {

    }

    /*
     * 📌 조회 : 개별 이슈 조회 시 코멘트 조회 . . . => 이슈에서 구현
     * 📌 삭제 : 개별 이슈 삭제 시 종속된 코멘트도 함께 삭제 . . . => 이슈에서 구현
     * 📌 코멘트 삭제 기능은 기획안에 없는듯?
     * */


}
