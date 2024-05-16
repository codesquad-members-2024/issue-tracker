package com.codesquad.team3.issuetracker.domain.issue;

import com.codesquad.team3.issuetracker.domain.issue.dto.request.CreateIssue;
import com.codesquad.team3.issuetracker.domain.issue.service.IssueService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @PutMapping("")
    public ResponseEntity<String> createIssue(@RequestBody @Valid CreateIssue createIssue) {


    }
}
