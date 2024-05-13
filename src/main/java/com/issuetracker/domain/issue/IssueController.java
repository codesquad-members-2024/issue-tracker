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
@RequestMapping("/api/v1/issues")
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
    public ResponseEntity<IssueDetailResponse> getDetail(@PathVariable("issueId") Long issueId) {
        return ResponseEntity
                .ok(issueService.getDetail(issueId));
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<Void> delete(@PathVariable("issueId") Long issueId) {
        issueService.delete(issueId);
        String redirectUrl = "/";
        return ResponseEntity.status(HttpStatus.FOUND)
                .header("Location", redirectUrl)
                .build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> edit(@PathVariable("id") Long id, @Valid @RequestBody IssueUpdateRequest request) {
        issueService.edit(request);
    @PatchMapping("/{issueId}")
    public ResponseEntity<Void> edit(@PathVariable("issueId") Long issueId, @Valid @RequestBody IssueUpdateRequest request) {
        return ResponseEntity
                .ok()
                .build();
    }
}
