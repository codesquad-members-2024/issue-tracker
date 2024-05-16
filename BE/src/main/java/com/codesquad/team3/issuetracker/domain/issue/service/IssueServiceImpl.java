package com.codesquad.team3.issuetracker.domain.issue.service;

import com.codesquad.team3.issuetracker.domain.comment.dto.CreateComment;
import com.codesquad.team3.issuetracker.domain.comment.service.CommentService;
import com.codesquad.team3.issuetracker.domain.issue.dto.request.CreateIssue;
import com.codesquad.team3.issuetracker.domain.issue.entity.Issue;
import com.codesquad.team3.issuetracker.domain.issue.repository.IssueRepository;
import com.codesquad.team3.issuetracker.global.exceptions.NoSuchRecordException;
import com.codesquad.team3.issuetracker.support.enums.OpenCloseSearchFlags;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.codesquad.team3.issuetracker.support.enums.OpenCloseSearchFlags.*;

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

    @Override
    public List<Issue> getAllIssues(int loadCount) {
        return null;
    }

    @Override
    public int getIssueCount(OpenCloseSearchFlags flags) {
        return issueRepository.countByCloseCondition(Issue.class, flags);
    }

    @Override
    public void openIssue(List<Integer> issueIds) throws NoSuchRecordException {
        for (Integer issueId : issueIds) {
            Optional<Issue> findIssue = issueRepository.findByIdWithOpenCondition(issueId, Issue.class, OPEN);
            issueRepository.open(findIssue.orElseThrow(NoSuchRecordException::new));
        }
    }

    @Override
    public void closeIssue(List<Integer> issueIds) throws NoSuchRecordException {
        for (Integer issueId : issueIds) {
            Optional<Issue> findIssue = issueRepository.findByIdWithOpenCondition(issueId, Issue.class, OPEN);
            issueRepository.close(findIssue.orElseThrow(NoSuchRecordException::new));
        }
    }


}
