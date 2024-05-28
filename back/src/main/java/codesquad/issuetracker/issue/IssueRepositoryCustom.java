package codesquad.issuetracker.issue;

import java.util.List;

public interface IssueRepositoryCustom {
    
    List<Issue> findIssuesByFilter(IssueFilterDto issueFilterDto);
}