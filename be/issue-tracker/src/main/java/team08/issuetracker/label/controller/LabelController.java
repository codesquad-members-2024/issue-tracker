package team08.issuetracker.label.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team08.issuetracker.label.model.Label;
import team08.issuetracker.label.model.dto.LabelCountDto;
import team08.issuetracker.label.model.dto.LabelCreationDto;
import team08.issuetracker.label.service.LabelService;

@RestController
@Slf4j
@RequestMapping("/label")
@RequiredArgsConstructor
@CrossOrigin("*")
public class LabelController {
    private final LabelService labelService;

    // Create
    @PostMapping
    public ResponseEntity<String> createLabel(@RequestBody LabelCreationDto labelCreationDto) {
        Label label = labelService.createLabel(labelCreationDto);

        log.info("라벨 생성 성공 : {}", label.toString());

        return ResponseEntity.ok("라벨생성 성공! 라벨 #" + label.getId() + " 라벨 이름 : " + label.getName());
    }

    @GetMapping("/count")
    public ResponseEntity<LabelCountDto> getLabelCount() {
        LabelCountDto labelCountDto = labelService.getLabelCount();

        return ResponseEntity.ok(labelCountDto);
    }
}
