package codesquad.issuetracker.milestone;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.issue.IssueService;
import codesquad.issuetracker.milestone.dto.MilestoneRequest;
import codesquad.issuetracker.milestone.dto.MilestoneQueryInfo;
import codesquad.issuetracker.milestone.dto.MilestoneResponse;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MilestoneService {

    private final MilestoneCustomRepository milestoneCustomRepository;
    private final MilestoneRepository milestoneRepository;
    private final IssueService issueService;

    public MilestoneService(MilestoneCustomRepository milestoneCustomRepository,
        MilestoneRepository milestoneRepository, IssueService issueService) {
        this.milestoneCustomRepository = milestoneCustomRepository;
        this.milestoneRepository = milestoneRepository;
        this.issueService = issueService;
    }

    public Milestone createNewMilestone(MilestoneRequest milestoneRequest) {
        return milestoneRepository.save(milestoneRequest.toEntity());
    }

    public List<MilestoneResponse> fetchFilteredMilestones(MilestoneQueryInfo milestoneQueryInfo) {
        List<Milestone> milestones = milestoneCustomRepository.findFilteredMilestones(
            milestoneQueryInfo);
        return milestones.stream()
            .map(milestone -> MilestoneResponse.of(milestone,
                issueService.findByMilestoneId(milestone.getId())))
            .toList();
    }

    public Milestone findById(Long id) {
        Optional<Milestone> optionalMilestone = milestoneRepository.findById(id);
        return optionalMilestone.orElseThrow(IllegalAccessError::new);

    }

    public Milestone updateMilestone(Long milestoneId,
        MilestoneRequest milestoneRequest) {
        int affectedRow = milestoneRepository.updateMilestone(milestoneId,
            milestoneRequest.getTitle(),
            milestoneRequest.getDescription(), milestoneRequest.getDueDate());
        if (affectedRow == 0) {
            throw new IllegalArgumentException("Milestone not found");
        }
        return findById(milestoneId);
    }

    public Milestone closeMilestone(Long milestoneId) {
        milestoneRepository.updateMilestoneState(milestoneId, State.CLOSED.name());
        return findById(milestoneId);
    }

    public ResponseEntity<String> softDeleteByMilestoneId(Long milestoneId) {
        Optional<Milestone> milestone = milestoneRepository.findById(milestoneId);
        if (milestone.isEmpty()) {
            return new ResponseEntity<>("Milestone not found", HttpStatus.NOT_FOUND);
        }
        milestoneCustomRepository.softDeleteByMilestoneId(milestoneId);
        return new ResponseEntity<>("Milestone is successfully deleted", HttpStatus.OK);
    }

    public Long countOpenMilestones() {
        return milestoneRepository.countOpenMilestones();
    }
}
