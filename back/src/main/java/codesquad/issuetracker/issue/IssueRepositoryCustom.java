package codesquad.issuetracker.issue;

import java.util.List;

public interface IssueRepositoryCustom {

    List<Long> findIssuesByFilter(IssueFilterDto issueFilterDto);
}