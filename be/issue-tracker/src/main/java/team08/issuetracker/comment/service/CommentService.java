package team08.issuetracker.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team08.issuetracker.comment.model.Comment;
import team08.issuetracker.comment.model.dto.CommentCreationRequest;
import team08.issuetracker.comment.model.dto.CommentUpdateRequest;
import team08.issuetracker.comment.repository.CommentRepository;
import team08.issuetracker.exception.comment.CommentNotFoundException;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public Comment createComment(CommentCreationRequest commentCreationRequest) {
        // 1) DTO -> Entity 변환
        Comment comment = commentCreationRequest.toEntity();

        // 2) 저장 및 반환
        return commentRepository.save(comment);
    }

    public Comment updateComment(Long issueId, Long id, CommentUpdateRequest commentUpdateRequest) {
        // 1) 주어진 issueId와 id에 해당하는 코멘트 찾기
        Comment comment = commentRepository.findByIdAndIssueId(id, issueId)
                .orElseThrow(CommentNotFoundException::new);

        // 2) 찾은 코멘트 업데이트 데이터로 갱신하기
        comment.update(commentUpdateRequest);

        // 3) 업데이트 내용 저장 및 반환
        return commentRepository.save(comment);
    }
}
