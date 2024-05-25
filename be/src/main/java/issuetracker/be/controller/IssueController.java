package issuetracker.be.controller;

import issuetracker.be.dto.IssueFilterRequest;
import issuetracker.be.dto.IssueListResponse;
import issuetracker.be.dto.IssueSaveRequest;
import issuetracker.be.service.IssueService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class IssueController {

  private final IssueService issueService;

  @Autowired
  public IssueController(IssueService issueService) {
    this.issueService = issueService;
  }

  @ResponseStatus(HttpStatus.CREATED)
  @PostMapping("/issue")
  public void saveIssue(@RequestBody IssueSaveRequest issueSaveRequest) {
    issueService.save(issueSaveRequest);
  }

  @GetMapping("/issue")
  public IssueListResponse findAllIssues() {
    return issueService.getAllIssue();
  }

  /**
   *
   * @param filterRequest : 부가적인 이슈 필터링(담당자, 라벨, 마일스톤, 작성자)
   * @return 필터링된 열려있거나 닫혀있는 모든 이슈
   */
  @GetMapping("/issue/filter")
  public IssueListResponse getAllFilteredIssues(@ModelAttribute IssueFilterRequest filterRequest) {
    log.debug("필터링 요청 정보 : {}", filterRequest);
    return issueService.getFilteredIssue(filterRequest);
  }
}
