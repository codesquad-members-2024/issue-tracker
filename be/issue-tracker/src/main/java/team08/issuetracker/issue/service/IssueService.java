package team08.issuetracker.issue.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team08.issuetracker.issue.model.Issue;
import team08.issuetracker.issue.model.dto.IssueCreationDto;
import team08.issuetracker.issue.ref.Assignee;
import team08.issuetracker.issue.ref.IssueAttachedLabel;
import team08.issuetracker.issue.repository.AssigneeRepository;
import team08.issuetracker.issue.repository.IssueAttachedLabelRepository;
import team08.issuetracker.issue.repository.IssueRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;
    private final AssigneeRepository assigneeRepository;
    private final IssueAttachedLabelRepository issueAttachedLabelRepository;

    public List<Issue> issues() {
        List<Issue> issues = new ArrayList<>();
        for (Issue issue : issueRepository.findAll()) {
            issues.add(issue);
        }

        return issues;
    }

    @Transactional
    public void createNewIssue(IssueCreationDto issueCreationDto) {

        // 다대다 관계를 갖는 assignee 를 제외한 값으로 issue 생성
        Issue issue = issueCreationDto.createIssue();
        Issue savedIssue = issueRepository.save(issue); // db에 저장하여 id(pk) 값이 autoIncrement 로 설정된 객체를 반환 받는다

        //다대다 관계 설정
        Set<Assignee> assignees = issueCreationDto.createAssigneesWithIssueId(savedIssue.getId());
        assigneeRepository.saveAll(assignees);

        Set<IssueAttachedLabel> issueAttachedLabels = issueCreationDto.createIssueAttachedLabelsWithIssueId(
                savedIssue.getId());
        issueAttachedLabelRepository.saveAll(issueAttachedLabels);

        savedIssue.setAssignees(assignees);
        savedIssue.setIssueAttachedLabels(issueAttachedLabels);
        log.info("SAVED ISSUE : {}", savedIssue);
    }
}
