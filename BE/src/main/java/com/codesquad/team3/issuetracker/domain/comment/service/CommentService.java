package com.codesquad.team3.issuetracker.domain.comment.service;

import com.codesquad.team3.issuetracker.domain.comment.dto.CreateComment;
import com.codesquad.team3.issuetracker.domain.comment.entity.Comment;

public interface CommentService {

    Comment createComment(CreateComment createComment);
}
