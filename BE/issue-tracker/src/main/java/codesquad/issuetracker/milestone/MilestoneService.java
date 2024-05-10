package codesquad.issuetracker.milestone;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;

    @Autowired
    public MilestoneService(MilestoneRepository milestoneRepository) {
        this.milestoneRepository = milestoneRepository;
    }

    public List<Milestone> fetchAllMilestones() {
       return (List<Milestone>) milestoneRepository.findAll();
    }

}
