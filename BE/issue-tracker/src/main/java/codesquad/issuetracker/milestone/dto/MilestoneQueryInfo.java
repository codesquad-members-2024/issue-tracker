package codesquad.issuetracker.milestone.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Sort.Direction;

@Builder
@Getter
public class MilestoneQueryInfo {

    private static final String DEFAULT_SORT = "updatedAt";

    public enum State {
        OPEN,
        CLOSED
    }

    @Builder.Default
    private Direction direction = Direction.ASC;
    @Builder.Default
    private String sort = DEFAULT_SORT;
    @Builder.Default
    private State state = State.OPEN;

}
