package com.codesquad.team3.issuetracker.domain.milestone.service;

import com.codesquad.team3.issuetracker.domain.milestone.entity.Milestone;

import java.util.List;

public interface MilestoneService {

    void create(Milestone milestone);

    void delete(Integer id);

    void update(Milestone updatemilestone);

    Milestone getMilestone(Integer id);

    List<Milestone> getOpenMilestones();

    public List<Milestone> getClosedMilestones();

}
