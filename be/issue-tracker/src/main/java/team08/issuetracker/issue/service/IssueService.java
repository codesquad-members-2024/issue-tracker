package team08.issuetracker.issue.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team08.issuetracker.issue.model.Issue;
import team08.issuetracker.issue.model.dto.IssueCreationDto;
import team08.issuetracker.issue.ref.Assignee;
import team08.issuetracker.issue.repository.AssigneeRepository;
import team08.issuetracker.issue.repository.IssueRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;
    private final AssigneeRepository assigneeRepository;

    public List<Issue> issues() {
        List<Issue> issues = new ArrayList<>();
        for (Issue issue : issueRepository.findAll()) {
            issues.add(issue);
        }

        return issues;
    }

    @Transactional
    public void createIssue(IssueCreationDto issueCreationDto) {

        // 다대다 관계를 갖는 assignee 를 제외한 값으로 issue 생성
        Issue issue = buildIssueWithoutAssignee(issueCreationDto);
        Issue savedIssue = issueRepository.save(issue); // db에 저장하여 id(pk) 값이 autoIncrement 로 설정된 객체를 반환 받는다

        // 중간테이블을 명시적으로 구현한 assignee 객체들을 생성한다
        Set<Assignee> assignees = createAssigneesFromDto(issueCreationDto, savedIssue.getId());
        assigneeRepository.saveAll(assignees);

        savedIssue.setAssignees(assignees);
        log.info("SAVED ISSUE : {}", savedIssue);
    }

    private Issue buildIssueWithoutAssignee(IssueCreationDto dto) {
        return new Issue(
                dto.title(),
                dto.writer(),
                dto.content(),
                dto.file()
        );
    }

    private Set<Assignee> createAssigneesFromDto(IssueCreationDto dto, Long issueId) {
        return dto.assigneeIds().stream()
                .map(assigneeId -> {
                    Assignee assignee = new Assignee();
                    assignee.setIssueId(issueId);
                    assignee.setMemberId(assigneeId);
                    return assignee;
                })
                .collect(Collectors.toSet());
    }
}
