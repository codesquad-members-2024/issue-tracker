package team08.issuetracker.issue.ref;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;

@Getter
@RequiredArgsConstructor
public class Assignee {
    @Id
    private Long id;
    private final Long issueId;
    private final String memberId;

    @Override
    public String toString() {
        return String.format("id : %d\n issueId : %d\n memberId : %s", id, issueId, memberId);
    }
}
