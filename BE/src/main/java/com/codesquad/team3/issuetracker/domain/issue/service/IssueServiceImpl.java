package com.codesquad.team3.issuetracker.domain.issue.service;

import com.codesquad.team3.issuetracker.domain.comment.dto.CreateComment;
import com.codesquad.team3.issuetracker.domain.comment.service.CommentService;
import com.codesquad.team3.issuetracker.domain.issue.dto.request.CreateIssue;
import com.codesquad.team3.issuetracker.domain.issue.entity.Issue;
import com.codesquad.team3.issuetracker.domain.issue.repository.IssueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService{

    private final IssueRepository issueRepository;
    private final CommentService commentService;

    @Override
    public void createIssue(CreateIssue createIssue) {
        Issue newIssue = Issue.builder()
                .writer_id(createIssue.getWriter())
                .create_time(LocalDateTime.now())
                .title(createIssue.getTitle())
                .milestone_id(createIssue.getMilestone())
                .build();

        Issue insertdIssue = issueRepository.insert(newIssue);
        commentService.createComment(new CreateComment(insertdIssue.getId(), createIssue));
    }
}
