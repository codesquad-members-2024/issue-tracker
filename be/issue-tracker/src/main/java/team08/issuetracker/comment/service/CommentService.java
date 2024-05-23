package team08.issuetracker.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team08.issuetracker.comment.model.Comment;
import team08.issuetracker.comment.model.dto.CommentCreationRequest;
import team08.issuetracker.comment.repository.CommentRepository;

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
}
