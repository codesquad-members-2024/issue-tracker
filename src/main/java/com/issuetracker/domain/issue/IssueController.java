package com.issuetracker.domain.issue;

import com.issuetracker.domain.issue.request.IssueCreateRequest;
import com.issuetracker.domain.issue.response.IssueDetailResponse;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{issueId}")
    public ResponseEntity<IssueDetailResponse> detail(@PathVariable Long issueId) {
        return ResponseEntity
                .ok(issueService.getDetail(issueId));
    }
}
