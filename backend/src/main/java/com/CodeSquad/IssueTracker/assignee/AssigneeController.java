package com.CodeSquad.IssueTracker.assignee;

import com.CodeSquad.IssueTracker.user.UserService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AssigneeController {

    private final AssigneeService assigneeService;

    public AssigneeController(AssigneeService assigneeService) {
        this.assigneeService = assigneeService;
    }

    @PostMapping("/issue/{issueId}/assignee/{userId}")
    public void assignUserToIssue(@PathVariable("issueId") Long issueId,
                                  @PathVariable("userId") String userId) {
        assigneeService.assignUserToIssue(issueId, userId);
    }

    @DeleteMapping("/issue/{issueId}/assignee/{userId}")
    public void deleteAssigneeFromIssue(@PathVariable("issueId") Long issueId,
                                         @PathVariable("userId") String userId) {
        assigneeService.removeAssigneeFromIssue(issueId, userId);
    }
}
