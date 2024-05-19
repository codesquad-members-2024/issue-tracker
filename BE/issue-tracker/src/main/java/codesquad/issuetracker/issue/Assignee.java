package codesquad.issuetracker.issue;

import lombok.Value;
import org.springframework.data.relational.core.mapping.Table;

@Table("ASSIGNEE")
@Value
public class Assignee {

    String assigneeId;

}
