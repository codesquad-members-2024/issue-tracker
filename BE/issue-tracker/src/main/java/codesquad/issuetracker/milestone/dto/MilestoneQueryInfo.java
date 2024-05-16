package codesquad.issuetracker.milestone.dto;

import codesquad.issuetracker.base.State;
import java.util.Objects;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.domain.Sort.Direction;


@Getter
public class MilestoneQueryInfo {

    private static final String DEFAULT_SORT = "updated_at";

    private Direction direction;
    private String sort;
    private State state;

    @Builder
    @PersistenceCreator
    public MilestoneQueryInfo(String direction, String sort, String state) {
        this.direction = Objects.requireNonNullElse(Direction.fromString(direction), Direction.ASC);
        this.sort = Objects.requireNonNullElse(sort, DEFAULT_SORT);
        this.state = Objects.requireNonNullElse(State.fromString(state), State.OPEN);
    }
}
