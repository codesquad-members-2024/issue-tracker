package team08.issuetracker.milestone.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team08.issuetracker.milestone.model.Milestone;
import team08.issuetracker.milestone.model.dto.MilestoneCreationDto;
import team08.issuetracker.milestone.model.dto.MilestoneOverviewDto;
import team08.issuetracker.milestone.model.dto.MilestoneUpdateDto;
import team08.issuetracker.milestone.service.MilestoneService;

@RestController
@Slf4j
@RequestMapping("/milestone")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MilestoneController {
    private final MilestoneService milestoneService;


    @GetMapping()
    public ResponseEntity<?> getAllMilestonesWithCounts(@RequestParam(required = false, value = "state") String state) {
        MilestoneOverviewDto milestoneOverviewDto = milestoneService.getAllMilestonesWithCounts(state);
        return ResponseEntity.ok(milestoneOverviewDto);
    }

    @PostMapping()
    public ResponseEntity<String> saveMilestone(@RequestBody MilestoneCreationDto milestoneCreationDto) {
        Milestone milestone = milestoneService.saveMilestone(milestoneCreationDto);
        log.debug(String.format("Milestone이 생성되었습니다. ID : %d, Name : %s", milestone.getId(), milestone.getName()));
        return ResponseEntity.ok(String.format("마일스톤 생성 성공! 마일스톤 #%d 이름 : %s", milestone.getId(), milestone.getName()));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> updateMilestone(@PathVariable long id, @RequestBody MilestoneUpdateDto milestoneUpdateDto) {
        Milestone milestone = milestoneService.updateMilestone(id, milestoneUpdateDto);
        log.debug(String.format("Milestone의 정보가 업데이트 되었습니다. ID : %d, Name : %s", milestone.getId(), milestone.getName()));
        return ResponseEntity.ok(String.format("마일스톤 수정 성공! 마일스톤 #%d 이름 : %s", milestone.getId(), milestone.getName()));
    }

    @PatchMapping("/{id}/open")
    public ResponseEntity<String> openMilestone(@PathVariable long id) {
        Milestone milestone = milestoneService.updateMilestoneStateToOpen(id);
        log.debug(String.format("Milestone Opened. ID : %d, Name : %s, Is_Open : %s", milestone.getId(), milestone.getName(), milestone.isOpen()));
        return ResponseEntity.ok(String.format("마일스톤 Open 성공! 마일스톤 #%d 이름 : %s", milestone.getId(), milestone.getName()));
    }

    @PatchMapping("/{id}/close")
    public ResponseEntity<String> closeMilestone(@PathVariable long id) {
        Milestone milestone = milestoneService.updateMilestoneStateToClose(id);
        log.debug(String.format("Milestone Closed. ID : %d, Name : %s, Is_Open : %s", milestone.getId(), milestone.getName(), milestone.isOpen()));
        return ResponseEntity.ok(String.format("마일스톤 Close 성공! 마일스톤 #%d 이름 : %s", milestone.getId(), milestone.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMilestone(@PathVariable long id) {
        milestoneService.deleteMilestone(id);
        return ResponseEntity.ok("마일스톤 삭제 성공!");
    }


}
