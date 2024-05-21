package codesquad.issuetracker.label;

import codesquad.issuetracker.label.dto.LabelResponse;
import codesquad.issuetracker.milestone.MilestoneService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/labels")
@RequiredArgsConstructor
public class LabelController {

    private final LabelService labelService;
    private final MilestoneService milestoneService;

    @GetMapping
    public ResponseEntity<List<LabelResponse>> fetchFilteredLabels(Pageable pageable) {
        List<Label> labels = labelService.fetchFilteredLabels(pageable);
        List<LabelResponse> labelResponses = labels.stream()
            .map(label -> LabelResponse.of(label, labelService.countLabels(), milestoneService.countOpenMilestones()))
            .toList();
        return ResponseEntity.ok().body(labelResponses);
    }

    @DeleteMapping("/{labelId}")
    public ResponseEntity<String> deleteLabel(@PathVariable Long labelId) {
        labelService.deleteById(labelId);
        return ResponseEntity.noContent().build();
    }
}
