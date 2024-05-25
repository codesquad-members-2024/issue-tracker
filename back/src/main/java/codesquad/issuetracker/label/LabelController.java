package codesquad.issuetracker.label;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class LabelController {

    private final LabelService labelService;

    @PostMapping("/labels")
    public ResponseEntity<Label> createLabel(@RequestBody Label label, UriComponentsBuilder uriComponentsBuilder) {
        Label createdLabel = labelService.createLabel(label);
        URI location = uriComponentsBuilder.path("/labels/{id}")
                .buildAndExpand(createdLabel.getId())
                .toUri();
        return ResponseEntity
                .created(location)
                .body(createdLabel);
    }

    @GetMapping("/labels")
    public ResponseEntity<List<LabelShowDto>> getAllLabels() {
        List<Label> allLabels = labelService.getAllLabels();
        List<LabelShowDto> allLabelShowDto = allLabels.stream()
                .map(label -> new LabelShowDto(label))
                .collect(Collectors.toList());
        return ResponseEntity.ok(allLabelShowDto);
    }

    @GetMapping("/labels/{labelId}")
    public ResponseEntity<LabelShowDto> labelDetail(@PathVariable Long labelId) {
        Label label = labelService.getLabelById(labelId);
        return ResponseEntity
                .ok(new LabelShowDto(label));
    }

    @PutMapping("/labels/{labelId}")
    public ResponseEntity<Label> updateLabelById(@PathVariable Long labelId, @RequestBody LabelUpdateDto labelUpdateDto) {
        Label updatedLabel = labelService.updateLabelById(labelUpdateDto.toEntity(labelId));
        return ResponseEntity.ok(updatedLabel);
    }

    @DeleteMapping("/labels/{labelId}")
    public ResponseEntity<Void> deleteLabel(@PathVariable Long labelId) {
        labelService.deleteLabelById(labelId);
        return ResponseEntity
                .noContent()
                .build();
    }
}