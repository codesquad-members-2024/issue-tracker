package team08.issuetracker.label.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
        labelService.createLabel(labelCreationDto);

        return ResponseEntity.ok("라벨생성 성공!");
    }

}
