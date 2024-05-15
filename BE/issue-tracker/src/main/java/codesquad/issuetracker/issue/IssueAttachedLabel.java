package codesquad.issuetracker.issue;

import lombok.Value;
import org.springframework.data.relational.core.mapping.Table;

@Table("ISSUE_LABEL")
@Value
public class IssueAttachedLabel {

    Long labelId;

}
