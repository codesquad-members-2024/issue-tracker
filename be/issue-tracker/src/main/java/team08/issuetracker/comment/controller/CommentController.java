package team08.issuetracker.comment.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team08.issuetracker.comment.model.Comment;
import team08.issuetracker.comment.model.dto.*;
import team08.issuetracker.comment.service.CommentService;

import java.util.List;
import java.util.stream.Collectors;

@RestController // ResponseBody + Controller
@RequestMapping("/issue/{issueId}/comment")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
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

    /*
     * 📌 조회 : 개별 이슈 조회 시 코멘트 조회 . . . => 리스트로 이슈에 넘겨주기
     * 📌 삭제 : 개별 이슈 삭제 시 종속된 코멘트도 함께 삭제 . . . => 이슈에서 구현
     * 📌 개별 코멘트 삭제 기능은 기획안에 존재하지 않음
     * */


}
