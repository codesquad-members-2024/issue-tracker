package codesquad.issuetracker.label;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class LabelController {

    private final LabelService labelService;

    @PostMapping("/labels")
    public ResponseEntity<Void> createLabel(@RequestBody Label label) {
        labelService.createLabel(label);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
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
    public ResponseEntity<Void> updateLabelById(@PathVariable Long labelId, @RequestBody Label updatedLabel) {
        updatedLabel.setId(labelId); // update 위해 label 엔티티에 id 추가
        labelService.updateLabelById(updatedLabel);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @DeleteMapping("/labels/{labelId}")
    public ResponseEntity<Void> deleteLabel(@PathVariable Long labelId) {
        labelService.deleteLabelById(labelId);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}