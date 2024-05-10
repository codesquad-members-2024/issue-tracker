package codesquad.issuetracker.issue;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@RequiredArgsConstructor
@Table("ISSUE_LABEL")
public class LabelRef {

    private final Long labelId;

}
