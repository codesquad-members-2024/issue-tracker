package team08.issuetracker.issue.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team08.issuetracker.issue.model.dto.IssueCountDto;
import team08.issuetracker.issue.repository.IssueRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class IssueCountService {
    private final IssueRepository issueRepository;

    public IssueCountDto getCounts(long milestoneId) {
        return new IssueCountDto(
                issueRepository.countOpenedIssuesByMilestoneId(milestoneId),
                issueRepository.countClosedIssuesByMilestoneId(milestoneId)
        );
    }

}
