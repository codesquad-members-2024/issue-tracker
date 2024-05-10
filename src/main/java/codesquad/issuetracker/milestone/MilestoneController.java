package codesquad.issuetracker.milestone;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/milestones")
@RequiredArgsConstructor
public class MilestoneController {

    private final MilestoneService milestoneService;


    @GetMapping
    public ResponseEntity<List<Milestone>> fetchAllMilestones() {
        List<Milestone> milestones = milestoneService.fetchAllMilestones();
        return ResponseEntity.ok().body(milestones);
    }

}
