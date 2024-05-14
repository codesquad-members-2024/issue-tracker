package team08.issuetracker.issue.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team08.issuetracker.issue.model.Issue;
import team08.issuetracker.issue.model.dto.IssueCreationDto;
import team08.issuetracker.issue.repository.IssueRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;

    public void createIssue(IssueCreationDto issueCreationDto) {
        String title = issueCreationDto.title();
        String content = issueCreationDto.content();
        String writer = issueCreationDto.writer();
        Object mileStone = issueCreationDto.mileStone();
        String file = issueCreationDto.file();
        List<String> assignees = issueCreationDto.assignees();
        List<Object> labels = issueCreationDto.labels();

        Issue issue = new Issue(title, writer,content, file, mileStone, labels, assignees);

        Issue savedIssue = issueRepository.save(issue);
    }
}
