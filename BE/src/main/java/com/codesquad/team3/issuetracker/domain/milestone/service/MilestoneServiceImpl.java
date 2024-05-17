package com.codesquad.team3.issuetracker.domain.milestone.service;

import com.codesquad.team3.issuetracker.domain.milestone.entity.Milestone;
import com.codesquad.team3.issuetracker.domain.milestone.repository.MilestoneRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MilestoneServiceImpl implements MilestoneService {

    private final MilestoneRepository milestoneRepository;

    @Override
    public void create(Milestone milestone) {
        milestoneRepository.insert(milestone);
    }
    @Override
    public void delete(Integer id) {
        milestoneRepository.deleteById(id);
    }

    @Override
    public void update(Integer id, Milestone updatemilestone) {
        milestoneRepository.updateById(id,
                updatemilestone.getTitle(),
                updatemilestone.getDescription(),
                updatemilestone.getDeadline());
    }
    @Override
    public Milestone getMilestone(Integer id) {
        return milestoneRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    }

    @Override
    public List<Milestone> getOpenMilestones() {
        return milestoneRepository.getMilestoneByClosed(false);
    }

    @Override
    public List<Milestone> getClosedMilestones() {
        return milestoneRepository.getMilestoneByClosed(true);
    }



}
