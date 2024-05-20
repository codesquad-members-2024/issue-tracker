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
    public ResponseEntity<LabelOverviewDto> getLabelsWithCount() {
        LabelOverviewDto labelOverviewDto = labelService.getLabelsWithCount();

        return ResponseEntity.ok(labelOverviewDto);
    }


    @PostMapping
    public ResponseEntity<String> createLabel(@RequestBody LabelCreationDto labelCreationDto) {
        Label label = labelService.createLabel(labelCreationDto);

        log.info("라벨 생성 성공 : {}", label.toString());

        return ResponseEntity.ok(String.format("라벨생성 성공! 라벨 #%d 라벨 이름 : %s", label.getId(), label.getName()));
    }


    @GetMapping("{id}")
    public ResponseEntity<LabelDto> getLabel(@PathVariable long id) {
        Label label = labelService.getLabel(id);

        LabelDto labelDto = new LabelDto(label);

        return ResponseEntity.ok(labelDto);
    }


    @PatchMapping("{id}")
    public ResponseEntity<String> updateLabel(@PathVariable long id, @RequestBody LabelUpdateDto labelUpdateDto) {
        Label label = labelService.updateLabel(id, labelUpdateDto);

        return ResponseEntity.ok(String.format("라벨수정 성공! 라벨 #%d 라벨 이름 : %s", label.getId(), label.getName()));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLabel(@PathVariable long id) {
        labelService.deleteLabel(id);

        return ResponseEntity.ok("라벨 삭제 성공!");
    }
}
