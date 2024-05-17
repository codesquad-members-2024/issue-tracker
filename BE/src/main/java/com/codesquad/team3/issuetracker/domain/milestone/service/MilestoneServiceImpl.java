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
    public void update(Milestone updatemilestone) {
        milestoneRepository.update(updatemilestone);
    }
    @Override
    public Milestone getMilestone(Integer id) {
        return milestoneRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    }

    @Override
    public List<Milestone> getOpenMilestones() {
        return milestoneRepository.getAllClosed();
    }

    @Override
    public List<Milestone> getClosedMilestones() {
        return milestoneRepository.getAllClosed();
    }



}
