package codesquad.issuetracker.milestone;


import static org.assertj.core.api.Assertions.assertThat;

import codesquad.issuetracker.base.State;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;

@DataJdbcTest
class MilestoneRepositoryTest {

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Test
    @DisplayName("마일스톤을 저장소에 저장하는 테스트")
    void testMilestoneSave() {

        Milestone milestone = Milestone.builder()
            .title("테스트 마일스톤")
            .description("테스트 내용")
            .dueDate(null)
            .state(State.OPEN)
            .isDeleted(false)
            .updatedAt(null)
            .build();

        Milestone savedMilestone = milestoneRepository.save(milestone);

        Optional<Milestone> fetchedMilestoneOpt = milestoneRepository.findById(
            savedMilestone.getId());

        // optional이기 때문에 get 하기전에 isPresent로 확인
        assertThat(fetchedMilestoneOpt).isPresent();

        Milestone fetchedMilestone = fetchedMilestoneOpt.get();
        assertThat(fetchedMilestone).usingRecursiveComparison().ignoringFields("id")
            .isEqualTo(savedMilestone);

    }
}
