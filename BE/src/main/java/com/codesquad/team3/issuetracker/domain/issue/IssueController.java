package com.codesquad.team3.issuetracker.domain.issue;

import com.codesquad.team3.issuetracker.domain.issue.dto.request.CreateIssue;
import com.codesquad.team3.issuetracker.domain.issue.entity.Issue;
import com.codesquad.team3.issuetracker.domain.issue.service.IssueService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController("/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @PutMapping("")
    public ResponseEntity<String> createIssue(@RequestBody @Valid CreateIssue createIssue, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            ResponseEntity.badRequest().body(String.format("errors"))
        }

        Issue insertIssue = issueService.createIssue(createIssue);

        return ResponseEntity.created(URI.create(String.format("IssueId = %d", insertIssue.getId()))).build();
    }

}
