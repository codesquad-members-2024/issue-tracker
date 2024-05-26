package codesquad.issuetracker.count.service;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.count.dto.IssueCount;
import codesquad.issuetracker.count.dto.LabelMilestoneCount;
import codesquad.issuetracker.issue.IssueRepository;
import codesquad.issuetracker.label.LabelRepository;
import codesquad.issuetracker.milestone.MilestoneRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CountService {

    private final LabelRepository labelRepository;
    private final MilestoneRepository milestoneRepository;
    private final IssueRepository issueRepository;


    public LabelMilestoneCount fetchLabelMilestoneCount() {
        return LabelMilestoneCount.builder()
            .openMilestoneCount(milestoneRepository.countOpenMilestones())
            .labelCount(labelRepository.countLabels())
            .build();
    }

    public IssueCount fetchIssueCount(Long milestoneId) {
        return IssueCount.builder()
            .openIssueCount(issueRepository.countIssueByMilestoneId(milestoneId, State.OPEN))
            .closedIssueCount(issueRepository.countIssueByMilestoneId(milestoneId, State.CLOSED))
            .build();
    }


}
