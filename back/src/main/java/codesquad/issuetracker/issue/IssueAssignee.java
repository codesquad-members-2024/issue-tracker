package codesquad.issuetracker.issue;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Table("issue_assignee")
public class IssueAssignee {

    @Id
    private Long id;
    private String userLoginId;
    private Long issueId;
}
