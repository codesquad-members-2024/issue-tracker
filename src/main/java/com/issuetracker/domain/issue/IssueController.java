package com.issuetracker.domain.issue;

import com.issuetracker.domain.issue.request.IssueCreateRequest;
import com.issuetracker.domain.issue.request.IssueUpdateRequest;
import com.issuetracker.domain.issue.response.IssueDetailResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @DeleteMapping("/{issueId}")
    public ResponseEntity<Void> delete(@PathVariable Long issueId) {
        issueService.delete(issueId);
        String redirectUrl = "/";
        return ResponseEntity.status(HttpStatus.FOUND)
                .header("Location", redirectUrl)
                .build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> edit(@PathVariable("id") Long id, @Valid @RequestBody IssueUpdateRequest request) {
        issueService.edit(request);
        return ResponseEntity
                .ok()
                .build();
    }
}
