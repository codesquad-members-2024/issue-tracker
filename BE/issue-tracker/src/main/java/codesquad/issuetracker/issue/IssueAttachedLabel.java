package codesquad.issuetracker.issue;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@RequiredArgsConstructor
@Table("ISSUE_LABEL")
@Value
public class IssueAttachedLabel {

    Long labelId;

}
