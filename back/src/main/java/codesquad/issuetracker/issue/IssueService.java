package codesquad.issuetracker.issue;

import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.label.LabelRepository;
import codesquad.issuetracker.user.User;
import codesquad.issuetracker.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;
    private final LabelRepository labelRepository;
    private final UserRepository userRepository;

    // IssueShowDto 만드는 매소드를 서비스에 구현한 이유
    // IssueRepository issueRepository; 를 컨트롤러에도 추가하는게 어색해서 일단 여기에 구현했습니다.
    // 근데 잘 모르겠어서 컨트롤러로 옮겨도 넘 좋아요!!!
    public List<IssueShowDto> getAllIssues() {
        List<Issue> issues = (List<Issue>) issueRepository.findAll();
        return issues.stream().map(issue -> new IssueShowDto(issue.getId(), issue.getTitle(), issue.getContent(), issue.getMilestoneId(), getIssueAssignees(issue), issue.getWriter(), issue.getCreateTime(), issue.getIsClosed(), getIssueLabels(issue))).toList();
    }

    // 중간 테이블 IssueLabel를 이용해, issue에 있는 Label를 List<Label>로 만들어 반환
    private List<Label> getIssueLabels(Issue issue) {
        List<String> labelNames = issue.getLabels().stream().map(IssueLabel::getLabelName).toList();
        return (List<Label>) labelRepository.findAllById(labelNames);
    }

    // 중간 테이블 IssueAssignee 이용해, issue에 있는 Assignee를 List<User>로 만들어 반환
    private List<User> getIssueAssignees(Issue issue) {
        List<String> assigneeNames = issue.getAssignees().stream().map(IssueAssignee::getUserLoginId).toList();
        return (List<User>) userRepository.findAllById(assigneeNames);
    }
}
