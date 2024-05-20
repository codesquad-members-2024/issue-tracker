package com.CodeSquad.IssueTracker.issues;

import com.CodeSquad.IssueTracker.Exception.issue.AuthorNotFoundException;
import com.CodeSquad.IssueTracker.Exception.issue.InvalidIssueDataException;
import com.CodeSquad.IssueTracker.Exception.issue.InvalidIssuePageException;
import com.CodeSquad.IssueTracker.Exception.issue.IssueNotExistException;
import com.CodeSquad.IssueTracker.issues.comment.Comment;
import com.CodeSquad.IssueTracker.issues.comment.CommentRepository;
import com.CodeSquad.IssueTracker.issues.comment.dto.CommentResponse;
import com.CodeSquad.IssueTracker.issues.dto.IssueDetailResponse;
import com.CodeSquad.IssueTracker.issues.dto.IssueMilestoneRequest;
import com.CodeSquad.IssueTracker.issues.dto.IssueRequest;
import com.CodeSquad.IssueTracker.issues.dto.IssueTitleRequest;
import com.CodeSquad.IssueTracker.milestone.Milestone;
import com.CodeSquad.IssueTracker.milestone.MilestoneService;
import com.CodeSquad.IssueTracker.user.User;
import com.CodeSquad.IssueTracker.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class IssueService {
    private final IssueRepository issueRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final MilestoneService milestoneService;

    public IssueService(IssueRepository issueRepository, CommentRepository commentRepository,
                        UserRepository userRepository, MilestoneService milestoneService) {
        this.issueRepository = issueRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.milestoneService = milestoneService;
    }

    public List<Issue> getAllIssues() {
        List<Issue> issues = (List<Issue>) issueRepository.findAll();
        log.info("Retrieved issues: {}", issues);
        return (List<Issue>) issueRepository.findAll();
    }

    public Long createIssue(IssueRequest issueRequest) {
        validateIssueRequest(issueRequest);

        log.info("Creating issue: {}", issueRequest);

        // 이슈 저장을 위한 객체 생성
        Issue issue = new Issue();
        issue.setTitle(issueRequest.title());
        issue.setAuthor(issueRequest.author());
        issue.setPublishedAt(LocalDateTime.now());
        issue.setIsClosed(false);
        issue.setMilestoneId(issueRequest.milestoneId());

        issueRepository.save(issue);
        milestoneService.incrementTotalIssue(issue.getMilestoneId());

        // 이슈 작성 시 입력한 내용을 첫번째 코멘트로 저장하기 위함.
        Comment comment = new Comment();
        comment.setAuthor(issueRequest.author());
        comment.setContent(issueRequest.content());
        comment.setPublishedAt(LocalDateTime.now());

        // save 메소드가 호출된 후, @ID 식별자로 지정된 필드에 자동생성된 ID가 설정되어 이용할 수 있다.
        comment.setIssueId(issue.getIssueId());

        commentRepository.save(comment);

        return issue.getIssueId();
    }

    public Issue findIssueById(long issueId) {
        return issueRepository.findById(issueId)
                .orElseThrow(() ->
                        new IssueNotExistException("존재하지 않는 이슈입니다."));
    }

    public List<Issue> findOpenIssues(long page, long limit) {
        validateIssueListPage(page);
        long offset = (page - 1) * limit;
        return issueRepository.findOpenIssues(limit, offset);
    }

    public List<Issue> findCloseIssues(long page, long limit) {
        validateIssueListPage(page);
        long offset = (page - 1) * limit;
        return issueRepository.findCloseIssues(limit, offset);
    }

    public IssueDetailResponse getIssueById(long issueId) {
        Issue issue = findIssueById(issueId);

        List<CommentResponse> comments = commentRepository.findByIssueId(issueId);

        return IssueDetailResponse.builder()
                .title(issue.getTitle())
                .author(issue.getAuthor())
                .publishedAt(issue.getPublishedAt().toString())
                .isClosed(issue.getIsClosed())
                .comments(comments)
                .build();
    }

    public void validateIssueListPage(long page) {
        if (page < 1) {
            throw new InvalidIssuePageException("page는 1 이상의 정수여야 합니다.");
        }
    }

    public void openIssue(long issueId) {
        issueRepository.openIssue(issueId);
        Issue issue = findIssueById(issueId);
        milestoneService.decrementClosedIssue(issue.getMilestoneId());
    }

    public void closeIssue(long issueId) {
        issueRepository.closeIssue(issueId);
        Issue issue = findIssueById(issueId);
        milestoneService.incrementClosedIssue(issue.getMilestoneId());
    }

    public void updateIssueTitle(Long issueId, IssueTitleRequest issueTitleRequest) {
        findIssueById(issueId);
        if (issueTitleRequest.title() != null) {
            issueRepository.updateIssueTitle(issueId, issueTitleRequest.title());
        }else {
            throw new InvalidIssueDataException("제목이 필요합니다.");
        }
        issueRepository.updateIssueTitle(issueId, issueTitleRequest.title());
    }

    private void validateIssueRequest(IssueRequest issueRequest) {
        Optional<User> user = userRepository.findById(issueRequest.author());
        if (user.isEmpty()) {
            throw new AuthorNotFoundException("작성자가 유효하지 않습니다. : " + issueRequest.author());
        }

        if (issueRequest.title() == null || issueRequest.title().isEmpty()
                || issueRequest.content() == null || issueRequest.content().isEmpty()) {
            throw new InvalidIssueDataException("제목과 내용이 모두 필요합니다.");
        }
    }

    public Milestone updateMilestoneIdForIssue(Long issueId, IssueMilestoneRequest issueMilestoneRequest) {
        Issue issue = findIssueById(issueId);
        Long milestoneId = issueMilestoneRequest.milestoneId();
        log.info("Updating milestone id for issue: {}", milestoneId);
        if (issue.getMilestoneId() == null) {
            // 이슈에 마일스톤 ID가 없는 경우
            milestoneService.incrementTotalIssue(milestoneId);
            if (issue.getIsClosed()) {
                milestoneService.incrementClosedIssue(milestoneId);
            }
            issueRepository.updateMilestoneIdForIssue(issueId, milestoneId);
            return milestoneService.getMilestoneById(milestoneId);
        } else
        if (milestoneId != null) {
            // 마일스톤 ID가 존재하는 경우 업데이트
            milestoneService.decrementTotalIssue(issue.getMilestoneId());
            milestoneService.incrementTotalIssue(milestoneId);

            if (issue.getIsClosed()) {
                milestoneService.decrementClosedIssue(issue.getMilestoneId());
                milestoneService.incrementClosedIssue(milestoneId);
            }

            issueRepository.updateMilestoneIdForIssue(issueId, milestoneId);
            return milestoneService.getMilestoneById(milestoneId);
        } else {
            // 마일스톤 ID가 null인 경우 해당 이슈의 마일스톤을 삭제
            milestoneService.decrementTotalIssue(issue.getMilestoneId());

            if (issue.getIsClosed()) {
                milestoneService.decrementClosedIssue(issue.getMilestoneId());
            }

            issueRepository.removeMilestoneFromIssue(issueId);
            return null;
        }
    }
}
