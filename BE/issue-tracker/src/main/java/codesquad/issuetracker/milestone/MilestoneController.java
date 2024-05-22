package codesquad.issuetracker.milestone;

import codesquad.issuetracker.milestone.dto.MilestoneCreateRequest;
import codesquad.issuetracker.milestone.dto.MilestoneQueryInfo;
import codesquad.issuetracker.milestone.dto.MilestoneResponse;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/milestones")
@RequiredArgsConstructor
public class MilestoneController {

    private static final Logger log = LoggerFactory.getLogger(MilestoneController.class);
    private final MilestoneService milestoneService;

    @PostMapping("/new")
    public ResponseEntity<Milestone> createNewMilestone(
        @RequestBody MilestoneCreateRequest milestoneCreateRequest) {
        Milestone newMilestone = milestoneService.createNewMilestone(milestoneCreateRequest);
        return ResponseEntity.created(URI.create("/api/milestones/" + newMilestone.getId()))
            .body(newMilestone);
    }

    @GetMapping
    public ResponseEntity<List<MilestoneResponse>> fetchFilteredMilestones(@ModelAttribute
    MilestoneQueryInfo milestoneQueryInfo) {
        List<MilestoneResponse> milestones = milestoneService.fetchFilteredMilestones(
            milestoneQueryInfo);
        return ResponseEntity.ok().body(milestones);

    }

    @PutMapping("/{milestoneId}")
    public ResponseEntity<Milestone> updateMilestone(@PathVariable Long milestoneId,
        @RequestBody MilestoneCreateRequest milestoneCreateRequest) {
        Milestone updatedMilestone = milestoneService.updateMilestone(milestoneId,
            milestoneCreateRequest);
        return ResponseEntity.ok().body(updatedMilestone);
    }

    @DeleteMapping("/{milestoneId}")
    public ResponseEntity<String> deleteMilestone(@PathVariable Long milestoneId) {
        return milestoneService.softDeleteByMilestoneId(milestoneId);
    }


    @GetMapping("/test")
    public ResponseEntity<String> test(@ModelAttribute MilestoneQueryInfo milestoneQueryInfo) {
        log.info(milestoneQueryInfo.getDirection().name());
        log.info(milestoneQueryInfo.getSort());
        log.info(milestoneQueryInfo.getState().name());
        return ResponseEntity.ok().body(milestoneQueryInfo.toString());
    }

    @PatchMapping("/{milestoneId}/close")
    public ResponseEntity<Milestone> closeMilestone(@PathVariable Long milestoneId) {
        Milestone milestone = milestoneService.closeMilestone(milestoneId);
        return ResponseEntity.ok(milestone);
    }
}
