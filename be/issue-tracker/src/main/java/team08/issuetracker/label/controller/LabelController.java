package team08.issuetracker.label.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team08.issuetracker.label.model.Label;
import team08.issuetracker.label.model.dto.*;
import team08.issuetracker.label.service.LabelService;

@RestController
@Slf4j
@RequestMapping("/label")
@RequiredArgsConstructor
public class LabelController {
    private final LabelService labelService;

    @GetMapping
    public ResponseEntity<LabelListWithCountResponse> getLabelsWithCount() {
        LabelListWithCountResponse labelListWithCountResponse = labelService.getLabelsWithCount();

        return ResponseEntity.ok(labelListWithCountResponse);
    }


    @PostMapping
    public ResponseEntity<LabelCreationResponse> createLabel(@RequestBody LabelCreationRequest labelCreationRequest) {
        Label label = labelService.createLabel(labelCreationRequest);

        LabelCreationResponse response = LabelCreationResponse.from(label);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }


    @GetMapping("{id}")
    public ResponseEntity<LabelResponse> getLabel(@PathVariable long id) {
        Label label = labelService.getLabel(id);

        LabelResponse labelResponse = new LabelResponse(label);

        return ResponseEntity.ok(labelResponse);
    }


    @PatchMapping("{id}")
    public ResponseEntity<LabelUpdateResponse> updateLabel(@PathVariable long id, @RequestBody LabelUpdateRequest labelUpdateRequest) {
        Label label = labelService.updateLabel(id, labelUpdateRequest);

        LabelUpdateResponse response = LabelUpdateResponse.from(label);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }


    @DeleteMapping("{id}")
    public ResponseEntity<LabelDeleteResponse> deleteLabel(@PathVariable long id) {
        labelService.deleteLabel(id);

        LabelDeleteResponse response = LabelDeleteResponse.from(id);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }
}
