package com.CodeSquad.IssueTracker.assignee;

import ch.qos.logback.core.pattern.util.AsIsEscapeUtil;
import com.CodeSquad.IssueTracker.Exception.assignee.AssigneeAlredyExistException;
import com.CodeSquad.IssueTracker.Exception.assignee.AssigneeNotFoundException;
import com.CodeSquad.IssueTracker.Exception.user.UserNotFoundException;
import com.CodeSquad.IssueTracker.assignee.dto.AssigneeId;
import com.CodeSquad.IssueTracker.issues.Issue;
import com.CodeSquad.IssueTracker.issues.IssueService;
import com.CodeSquad.IssueTracker.user.User;
import com.CodeSquad.IssueTracker.user.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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

    public void updateAssignees(Long issueId, Set<String> newAssigneeIds) {
        Set<User> allByIds = userService.findAllByIds(newAssigneeIds);
        if (allByIds.size() != newAssigneeIds.size())
            throw new UserNotFoundException("존재하지 않는 유저가 포함되어 있습니다.");
        issueService.updateAssignees(issueId, newAssigneeIds);
    }

}
