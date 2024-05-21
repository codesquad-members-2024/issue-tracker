package com.CodeSquad.IssueTracker.assignee;

import org.springframework.stereotype.Service;

@Service
public class AssigneeService {

    private final AssigneeRepository assigneeRepository;

    public AssigneeService(AssigneeRepository assigneeRepository) {
        this.assigneeRepository = assigneeRepository;
    }


}
