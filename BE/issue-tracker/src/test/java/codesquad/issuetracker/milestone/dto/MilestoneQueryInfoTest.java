package codesquad.issuetracker.milestone.dto;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Sort.Direction;

class MilestoneQueryInfoTest {

    private MilestoneQueryInfo milestoneQueryInfo;

    @BeforeEach
    void setUp() {
        milestoneQueryInfo = MilestoneQueryInfo.builder().build();
    }

    @Test
    @DisplayName("state에 아무런 값이 없는 경우 open을 반환하는 테스트")
    void testOpenStateWhenStateParamIsEmpty() {
        assertThat(milestoneQueryInfo.getState()).isEqualTo(MilestoneQueryInfo.State.OPEN);
    }

    @Test
    @DisplayName("Direction에 아무런 값이 없는 경우 오름차순이 되는지 테스트")
    void testDirectionWhenDirectionParamEmpty() {
        assertThat(milestoneQueryInfo.getDirection()).isEqualTo(Direction.ASC);
    }

    @Test
    @DisplayName("Sort의 기본값이 updatedAt 필드인지 확인하는 테스트")
    void testDefaultSortValue() {
        assertThat(milestoneQueryInfo.getSort()).isEqualTo("updatedAt");
    }


}
