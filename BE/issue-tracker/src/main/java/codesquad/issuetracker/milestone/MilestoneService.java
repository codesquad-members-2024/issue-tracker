package codesquad.issuetracker.milestone;

import codesquad.issuetracker.issue.IssueService;
import codesquad.issuetracker.milestone.dto.CreateMilestoneRequest;
import codesquad.issuetracker.milestone.dto.MilestoneQueryInfo;
import codesquad.issuetracker.milestone.dto.MilestoneResponse;
import java.util.List;
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

    public Milestone createNewMilestone(CreateMilestoneRequest createMilestoneRequest) {
        return milestoneRepository.save(createMilestoneRequest.toEntity());
    }

    public List<MilestoneResponse> fetchFilteredMilestones(MilestoneQueryInfo milestoneQueryInfo) {
        List<Milestone> milestones = milestoneCustomRepository.findFilteredMilestones(
            milestoneQueryInfo);
        return milestones.stream()
            .map(milestone -> MilestoneResponse.of(milestone,
                issueService.findByMilestoneId(milestone.getId())))
            .toList();
    }
}
