package team08.issuetracker.label.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team08.issuetracker.exception.label.LabelNotFoundException;
import team08.issuetracker.label.model.Label;
import team08.issuetracker.label.model.dto.*;
import team08.issuetracker.label.repository.LabelRepository;
import team08.issuetracker.label.service.LabelService;

@RestController
@Slf4j
@RequestMapping("/label")
@RequiredArgsConstructor
@CrossOrigin("*")
public class LabelController {
    private final LabelService labelService;
    private final LabelRepository labelRepository;

    @GetMapping
    public ResponseEntity<?> getLabelsWithCount() {
        LabelResponse labelResponse = labelService.getLabelsWithCount();

        return ResponseEntity.ok(labelResponse);
    }


    @PostMapping
    public ResponseEntity<String> createLabel(@RequestBody LabelCreationDto labelCreationDto) {
        Label label = labelService.createLabel(labelCreationDto);

        log.info("TEST : {}",labelCreationDto.description()==null);
        log.info("라벨 생성 성공 : {}", label.toString());

        return ResponseEntity.ok("라벨생성 성공! 라벨 #" + label.getId() + " 라벨 이름 : " + label.getName());
    }


    @GetMapping("{id}")
    public ResponseEntity<LabelDto> getLabel(@PathVariable long id) {
        Label label = labelRepository.findById(id).orElseThrow(LabelNotFoundException::new);

        LabelDto labelDto = new LabelDto(label);

        log.info("조회테스트, null 인가? : {}",labelDto.getDescription()==null);

        return ResponseEntity.ok(labelDto);
    }


    @PatchMapping("{id}")
    public ResponseEntity<String> updateLabel(@PathVariable long id, @RequestBody LabelUpdateDto labelUpdateDto) {
        Label label = labelService.updateLabel(id, labelUpdateDto);

        return ResponseEntity.ok("라벨 수정 성공! 라벨 #" + label.getId() + " 이름 : " + label.getName());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLabel(@PathVariable long id) {
        labelService.deleteLabel(id);

        return ResponseEntity.ok("라벨 삭제 성공!");
    }
}
