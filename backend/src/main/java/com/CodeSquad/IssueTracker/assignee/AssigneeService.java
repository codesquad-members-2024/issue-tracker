package com.CodeSquad.IssueTracker.assignee;

import ch.qos.logback.core.pattern.util.AsIsEscapeUtil;
import com.CodeSquad.IssueTracker.Exception.assignee.AssigneeAlredyExistException;
import com.CodeSquad.IssueTracker.Exception.assignee.AssigneeNotFoundException;
import com.CodeSquad.IssueTracker.issues.IssueService;
import com.CodeSquad.IssueTracker.user.UserService;
import org.springframework.stereotype.Service;

@Service
public class AssigneeService {

    private final AssigneeRepository assigneeRepository;
    private final UserService userService;
    private final IssueService issueService;

    public AssigneeService(AssigneeRepository assigneeRepository, UserService userService, IssueService issueService) {
        this.assigneeRepository = assigneeRepository;
        this.userService = userService;
        this.issueService = issueService;
    }


    public void assignUserToIssue(Long issueId, String userId) {
        userService.validateExistUser(userId);
        issueService.validateExistIssue(issueId);

        if (assigneeRepository.findByIssueIdAndUserId(issueId, userId).isPresent()) {
            throw new AssigneeAlredyExistException("이미 존재하는 담당자입니다.");
        }

        Assignee assignee = Assignee.builder()
                .issueId(issueId)
                .userId(userId)
                .build();

        assigneeRepository.save(assignee);
    }

    public void removeAssigneeFromIssue(Long issueId, String userId) {
        userService.validateExistUser(userId);
        issueService.validateExistIssue(issueId);
        assigneeRepository.findByIssueIdAndUserId(issueId, userId)
                .orElseThrow(() -> new AssigneeNotFoundException("담당자가 존재하지 않습니다."));

        assigneeRepository.deleteByIssueIdAndUserId(issueId, userId);
    }
}
