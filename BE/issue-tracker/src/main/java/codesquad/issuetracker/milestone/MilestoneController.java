package codesquad.issuetracker.milestone;

import codesquad.issuetracker.milestone.dto.CreateMilestoneRequest;
import codesquad.issuetracker.milestone.dto.MilestoneQueryInfo;
import codesquad.issuetracker.milestone.dto.MilestoneResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/milestones")
@RequiredArgsConstructor
public class MilestoneController {

    private static final Logger log = LoggerFactory.getLogger(MilestoneController.class);
    private final MilestoneService milestoneService;

    @PostMapping
    public ResponseEntity<Milestone> createNewMilestone(
        @RequestBody CreateMilestoneRequest createMilestoneRequest) {
        Milestone newMilestone = milestoneService.createNewMilestone(createMilestoneRequest);
        return ResponseEntity.ok().body(newMilestone);
    }

    @GetMapping
    public ResponseEntity<List<MilestoneResponse>> fetchFilteredMilestones(@ModelAttribute
    MilestoneQueryInfo milestoneQueryInfo) {
        List<MilestoneResponse> milestones = milestoneService.fetchFilteredMilestones(
            milestoneQueryInfo);
        return ResponseEntity.ok().body(milestones);

    }

    @GetMapping("/test")
    public ResponseEntity<String> test(@ModelAttribute MilestoneQueryInfo milestoneQueryInfo) {
        log.info(milestoneQueryInfo.getDirection().name());
        log.info(milestoneQueryInfo.getSort());
        log.info(milestoneQueryInfo.getState().name());
        return ResponseEntity.ok().body(milestoneQueryInfo.toString());
    }
}
