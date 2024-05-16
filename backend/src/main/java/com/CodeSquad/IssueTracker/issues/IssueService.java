package com.CodeSquad.IssueTracker.issues;

import com.CodeSquad.IssueTracker.Exception.issue.AuthorNotFoundException;
import com.CodeSquad.IssueTracker.Exception.issue.InvalidIssueDataException;
import com.CodeSquad.IssueTracker.Exception.issue.InvalidIssuePageException;
import com.CodeSquad.IssueTracker.issues.comment.Comment;
import com.CodeSquad.IssueTracker.issues.comment.CommentRepository;
import com.CodeSquad.IssueTracker.issues.dto.IssueRequest;
import com.CodeSquad.IssueTracker.user.User;
import com.CodeSquad.IssueTracker.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
public class IssueService {
    private final IssueRepository issueRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public IssueService(IssueRepository issueRepository, CommentRepository commentRepository, UserRepository userRepository) {
        this.issueRepository = issueRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
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

        issueRepository.save(issue);

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

    public List<Issue> findOpenIssues(long page, long limit) {
        long offset = (page - 1) * limit;
        return issueRepository.findOpenIssues(limit, offset);
    }

    public List<Issue> findCloseIssues(long page, long limit) {
        long offset = (page - 1) * limit;
        return issueRepository.findCloseIssues(limit, offset);
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
}
