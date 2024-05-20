package com.CodeSquad.IssueTracker.issues.comment;


import com.CodeSquad.IssueTracker.issues.comment.dto.CommentCreateRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }


    public void addComment(CommentCreateRequest request, Long issueId) {
        Comment comment = Comment.builder()
                .author(request.author())
                .content(request.content())
                .issueId(issueId)
                .publishedAt(LocalDateTime.now())
                .build();
        commentRepository.save(comment);
    }
}
