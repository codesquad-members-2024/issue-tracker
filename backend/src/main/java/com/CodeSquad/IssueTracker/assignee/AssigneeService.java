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

    private final UserService userService;

    public AssigneeService(UserService userService) {
        this.userService = userService;
    }

    public void validateNewAssigneeIds(Set<String> newAssigneeIds) {
        Set<User> allByIds = userService.findAllByIds(newAssigneeIds);
        if (allByIds.size() != newAssigneeIds.size())
            throw new UserNotFoundException("존재하지 않는 유저가 포함되어 있습니다.");
    }

}
