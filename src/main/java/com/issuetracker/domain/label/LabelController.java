package com.issuetracker.domain.label;

import com.issuetracker.domain.label.request.LabelCreateRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/labels")
@RestController
@RequiredArgsConstructor
public class LabelController {

    private final LabelService labelService;

    @PostMapping
    public ResponseEntity<Void> create (@Valid @RequestBody LabelCreateRequest labelCreateRequest) {
        labelService.create(labelCreateRequest);
        return ResponseEntity.ok().build();
    }
}
