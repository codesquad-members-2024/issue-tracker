package team08.issuetracker.issue.ref;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
public class IssueAttachedLabel {
    @Id
    private Long id;
    private Long issueId;
    private Long labelId;
}
