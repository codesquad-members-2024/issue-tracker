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
@CrossOrigin("*")
public class LabelController {
    private final LabelService labelService;

    @GetMapping
    public ResponseEntity<LabelOverviewResponse> getLabelsWithCount() {
        LabelOverviewResponse labelOverviewResponse = labelService.getLabelsWithCount();

        return ResponseEntity.ok(labelOverviewResponse);
    }


    @PostMapping
    public ResponseEntity<String> createLabel(@RequestBody LabelCreationRequest labelCreationRequest) {
        Label label = labelService.createLabel(labelCreationRequest);

        log.info("라벨 생성 성공 : {}", label.toString());

        return ResponseEntity.ok(String.format("라벨생성 성공! 라벨 #%d 라벨 이름 : %s", label.getId(), label.getName()));
    }


    @GetMapping("{id}")
    public ResponseEntity<LabelResponse> getLabel(@PathVariable long id) {
        Label label = labelService.getLabel(id);

        LabelResponse labelResponse = new LabelResponse(label);

        return ResponseEntity.ok(labelResponse);
    }


    @PatchMapping("{id}")
    public ResponseEntity<String> updateLabel(@PathVariable long id, @RequestBody LabelUpdateRequest labelUpdateRequest) {
        Label label = labelService.updateLabel(id, labelUpdateRequest);

        return ResponseEntity.ok(String.format("라벨수정 성공! 라벨 #%d 라벨 이름 : %s", label.getId(), label.getName()));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLabel(@PathVariable long id) {
        labelService.deleteLabel(id);

        return ResponseEntity.ok("라벨 삭제 성공!");
    }
}
