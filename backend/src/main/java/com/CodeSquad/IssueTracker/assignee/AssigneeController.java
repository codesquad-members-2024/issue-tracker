package com.CodeSquad.IssueTracker.assignee;

import com.CodeSquad.IssueTracker.assignee.dto.AssigneeRequest;
import com.CodeSquad.IssueTracker.user.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
public class AssigneeController {

    private final AssigneeService assigneeService;

    public AssigneeController(AssigneeService assigneeService) {
        this.assigneeService = assigneeService;
    }

    @PostMapping("/issue/{issueId}/assignees")
    public void updateAssignee(@PathVariable("issueId") Long issueId,
                               @RequestBody AssigneeRequest assigneeRequest) {
        assigneeService.updateAssignees(issueId, assigneeRequest.assignees());
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
