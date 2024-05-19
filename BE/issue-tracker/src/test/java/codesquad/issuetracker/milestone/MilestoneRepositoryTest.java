package codesquad.issuetracker.milestone;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import codesquad.issuetracker.base.State;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MilestoneRepositoryTest {


    @Autowired
    private MilestoneRepository milestoneRepository;
    @Autowired
    private MilestoneCustom milestoneCustom;

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

    @Test
    @DisplayName("마일스톤을 softDelete 했을 때 isdeleted가 false인지 테스트")
    void testMilestoneSoftDelete() {
        Milestone milestone = Milestone.builder()
            .title("테스트 마일스톤")
            .description("테스트 내용")
            .dueDate(null)
            .state(State.OPEN)
            .isDeleted(false)
            .updatedAt(null)
            .build();

        Milestone savedMilestone = milestoneRepository.save(milestone);

        milestoneCustom.softDeleteByMilestoneId(savedMilestone.getId());

        Optional<Milestone> fetchedMilestoneOpt = milestoneRepository.findById(
            savedMilestone.getId());

        assertThat(fetchedMilestoneOpt).isPresent();

        Milestone fetchedMilestone = fetchedMilestoneOpt.get();
        assertThat(fetchedMilestone.isDeleted()).isTrue();
    }

    @Test
    @DisplayName("이미 삭제된 마일스톤을 또 삭제하는 테스트")
    void testSoftDeletedAlreadyDeletedMilestone() {
        Milestone milestone = Milestone.builder()
            .title("테스트 마일스톤")
            .description("테스트 내용")
            .dueDate(null)
            .state(State.OPEN)
            .isDeleted(false)
            .updatedAt(null)
            .build();

        Milestone savedMilestone = milestoneRepository.save(milestone);
        milestoneCustom.softDeleteByMilestoneId(savedMilestone.getId());

        Optional<Milestone> fetchedMilestoneOpt = milestoneRepository.findById(
            savedMilestone.getId());

        assertThat(fetchedMilestoneOpt).isPresent();
        Milestone fetchedMilestone = fetchedMilestoneOpt.get();

        assertThat(fetchedMilestone.isDeleted()).isTrue();


    }

}
