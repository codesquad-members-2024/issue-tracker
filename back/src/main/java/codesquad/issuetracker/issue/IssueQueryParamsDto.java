package codesquad.issuetracker.issue;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class IssueQueryParamsDto {

    private Long milestoneId;
    private List<Long> labelIds;
    private List<Long> assigneeIds;
}
