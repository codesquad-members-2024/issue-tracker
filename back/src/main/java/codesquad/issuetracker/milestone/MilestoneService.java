package codesquad.issuetracker.milestone;

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
        return (List<Milestone>) milestoneRepository.findAll();
    }

    public MilestoneShowDto getMilestoneById(Long milestoneId) {
        Milestone milestone = milestoneRepository.findById(milestoneId).orElseThrow(RuntimeException::new);
        return new MilestoneShowDto(milestone);
    }

    public void updateMilestoneById(Milestone milestone) {
        milestoneRepository.save(milestone);
    }

    public void deleteMilestoneById(Long milestoneId) {
        milestoneRepository.deleteById(milestoneId);
    }
}
