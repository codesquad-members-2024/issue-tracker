package com.codesquad.team3.issuetracker.domain.issue.service;

import com.codesquad.team3.issuetracker.domain.issue.dto.request.CreateIssue;

public interface IssueService {

    void createIssue(CreateIssue createIssue);
}
