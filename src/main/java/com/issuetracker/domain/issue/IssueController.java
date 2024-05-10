package com.issuetracker.domain.issue;

import com.issuetracker.domain.issue.request.IssueCreateRequest;
import com.issuetracker.domain.issue.response.IssueDetailResponse;
import com.issuetracker.domain.issue.request.IssueUpdateRequest;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/{issueId}")
    public ResponseEntity<IssueDetailResponse> detail(@PathVariable Long issueId) {
        return ResponseEntity
                .ok(issueService.getDetail(issueId));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> edit(@PathVariable("id") Long id, @Valid @RequestBody IssueUpdateRequest request) {
        issueService.edit(request);
        return ResponseEntity
                .ok()
                .build();
    }
}
