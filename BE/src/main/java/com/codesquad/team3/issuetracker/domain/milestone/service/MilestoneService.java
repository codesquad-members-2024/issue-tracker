package com.codesquad.team3.issuetracker.domain.milestone.service;

import com.codesquad.team3.issuetracker.domain.milestone.entity.Milestone;
import com.codesquad.team3.issuetracker.domain.milestone.repository.MilestoneRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;


    public void create(Milestone milestone) {
        milestoneRepository.insert(milestone);
    }

    public void delete(Milestone milestone) {
        milestoneRepository.delete(milestone);
    }
}
