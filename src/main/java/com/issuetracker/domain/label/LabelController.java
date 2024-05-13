package com.issuetracker.domain.label;

import com.issuetracker.domain.label.request.LabelCreateRequest;
import com.issuetracker.domain.label.response.LabelListResponse;
import com.issuetracker.domain.label.response.LabelResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/labels")
@RestController
@RequiredArgsConstructor
public class LabelController {

    private final LabelService labelService;

    @PostMapping
    public ResponseEntity<LabelResponse> create (@Valid @RequestBody LabelCreateRequest labelCreateRequest) {
        return ResponseEntity.ok(
                labelService.create(labelCreateRequest)
        );
    }

    @GetMapping
    public ResponseEntity<LabelListResponse> getLabels() {
        return ResponseEntity.ok(
                labelService.getLabels()
        );
    }
}
