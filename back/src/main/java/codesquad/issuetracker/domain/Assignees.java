package codesquad.issuetracker.domain;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Table("user_manager")
public class Assignees {

    @Id
    private Long id;
    private String user_id;
    private Long issue_id;
}
