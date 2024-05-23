package codesquad.issuetracker.issue;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class IssueQueryParamsDto {

    private List<String> assigneeIds;
    private List<Long> labelIds;
    private Long milestoneId;
    private String writer;
}
