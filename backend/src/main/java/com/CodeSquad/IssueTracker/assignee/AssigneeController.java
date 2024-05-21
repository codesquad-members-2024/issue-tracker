package com.CodeSquad.IssueTracker.assignee;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class AssigneeController {

    private final AssigneeService assigneeService;

    public AssigneeController(AssigneeService assigneeService) {
        this.assigneeService = assigneeService;
    }


}
