package team08.issuetracker.issue.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import team08.issuetracker.issue.model.dto.IssueCreationDto;
import team08.issuetracker.issue.service.IssueService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class IssueController {
    private final IssueService issueService;

    @PostMapping("/issue")
    public ResponseEntity<String> createIssue(@RequestBody IssueCreationDto issueCreationDto) {

        issueService.createIssue(issueCreationDto);

        return ResponseEntity.ok("이슈 생성 성공");
    }
}