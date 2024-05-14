package codesquad.issuetracker.milestone;

import codesquad.issuetracker.milestone.dto.CreateMilestoneRequest;
import codesquad.issuetracker.milestone.dto.MilestoneQueryInfo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;
    private final MilestoneCustomRepository milestoneCustomRepository;

    @Autowired
    public MilestoneService(MilestoneRepository milestoneRepository,
        MilestoneCustomRepository milestoneCustomRepository) {
        this.milestoneRepository = milestoneRepository;
        this.milestoneCustomRepository = milestoneCustomRepository;
    }


    public List<Milestone> fetchAllMilestones() {
       return (List<Milestone>) milestoneRepository.findAll();
    }

    public Milestone createNewMilestone(CreateMilestoneRequest createMilestoneRequest) {
        return milestoneRepository.save(createMilestoneRequest.toEntity());
    }

    public List<Milestone> fetchFilteredMilestones(MilestoneQueryInfo milestoneQueryInfo) {
        return milestoneCustomRepository.findFilteredMilestones(milestoneQueryInfo);
    }

}
