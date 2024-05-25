package codesquad.issuetracker.milestone;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class MilestoneController {

    private final MilestoneService milestoneService;

    @PostMapping("/milestones")
    public ResponseEntity<MilestoneShowDto> createMilestone(@RequestBody MilestoneSaveDto milestoneSaveDto, UriComponentsBuilder uriComponentsBuilder) {
        Milestone createdMilestone = milestoneService.createMilestone(milestoneSaveDto.toEntity());
        URI location = uriComponentsBuilder.path("/milestones/{id}")
                .buildAndExpand(createdMilestone.getId())
                .toUri();
        return ResponseEntity
                .created(location)
                .body(new MilestoneShowDto(createdMilestone));
    }

    @GetMapping("/milestones")
    public ResponseEntity<List<MilestoneShowDto>> getAllMilestones() {
        List<Milestone> allMilestones = milestoneService.getAllMilestones();
        List<MilestoneShowDto> allMilestoneShowDto = allMilestones.stream()
                .map(milestone -> new MilestoneShowDto(milestone))
                .collect(Collectors.toList());
        return ResponseEntity.ok(allMilestoneShowDto);
    }

    @GetMapping("/milestones/{milestoneId}")
    public ResponseEntity<MilestoneShowDto> milestoneDetail(@PathVariable Long milestoneId) {
        Milestone milestone = milestoneService.getMilestoneById(milestoneId);
        return ResponseEntity
                .ok(new MilestoneShowDto(milestone));
    }

    @PutMapping("/milestones/{milestoneId}")
    public ResponseEntity<MilestoneShowDto> updateMilestoneById(@PathVariable Long milestoneId, @RequestBody MilestoneUpdateDto milestoneUpdateDto) {
        Milestone updatedMilestone = milestoneService.updateMilestoneById(milestoneUpdateDto.toEntity(milestoneId));
        return ResponseEntity.ok(new MilestoneShowDto(updatedMilestone));
    }

    @DeleteMapping("/milestones/{milestoneId}")
    public ResponseEntity<Void> deleteMilestone(@PathVariable Long milestoneId) {
        milestoneService.deleteMilestoneById(milestoneId);
        return ResponseEntity
                .noContent()
                .build();
    }
}
