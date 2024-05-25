package codesquad.issuetracker.milestone;

import codesquad.issuetracker.exception.MilestoneNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;

    public Milestone createMilestone(Milestone milestone) {
        return milestoneRepository.save(milestone);
    }

    public List<Milestone> getAllMilestones() {
        return milestoneRepository.findAll();
    }

    public Milestone getMilestoneById(Long milestoneId) {
        return milestoneRepository.findById(milestoneId).orElseThrow(() -> new MilestoneNotFoundException("존재하지 않는 마일스톤 입니다."));
    }

    public Milestone updateMilestoneById(Milestone milestone) {
        return milestoneRepository.save(milestone);
    }

    public void deleteMilestoneById(Long milestoneId) {
        milestoneRepository.deleteById(milestoneId);
    }
}
