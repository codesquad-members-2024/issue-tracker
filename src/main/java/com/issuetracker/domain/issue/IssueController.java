package com.issuetracker.domain.issue;

import com.issuetracker.domain.issue.request.IssueCreateRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody IssueCreateRequest request) {
        return ResponseEntity
                .created(URI.create("/issues/" + issueService.create(request)))
                .build();
    }
}
