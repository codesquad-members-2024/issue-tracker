package codesquad.issuetracker.issue;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class IssueFilterDto {

    private String assignee;
    private Long labelId;
    private Long milestoneId;
    private String writer;
}
