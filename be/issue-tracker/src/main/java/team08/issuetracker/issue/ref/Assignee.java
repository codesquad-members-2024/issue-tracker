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
}
