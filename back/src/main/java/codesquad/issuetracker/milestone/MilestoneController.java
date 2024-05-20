package codesquad.issuetracker.milestone;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class MilestoneController {

    private final MilestoneService milestoneService;

    @PostMapping("/milestones")
    public ResponseEntity<Void> createMilestone(@RequestBody MilestoneSaveDto milestoneSaveDto) {
        milestoneService.createMilestone(milestoneSaveDto.toEntity());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

    @GetMapping("/milestones")
    public ResponseEntity<List<MilestoneShowDto>> getAllMilestones() {
        List<Milestone> allMilestones = milestoneService.getAllMilestones();
        List<MilestoneShowDto> allMilestoneShowDto = allMilestones.stream()
                .map(milestone -> new MilestoneShowDto(milestone))
                .collect(Collectors.toList());
        return ResponseEntity.ok(allMilestoneShowDto);
    }

    @PutMapping("/milestones/{milestoneId}")
    public ResponseEntity<Void> updateMilestoneById(@PathVariable Long milestoneId, @RequestBody MilestoneUpdateDto milestoneUpdateDto) {
        milestoneService.updateMilestoneById(milestoneUpdateDto.toEntity(milestoneId));
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @DeleteMapping("/milestones/{milestoneId}")
    public ResponseEntity<Void> deleteMilestone(@PathVariable Long milestoneId) {
        milestoneService.deleteMilestoneById(milestoneId);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
