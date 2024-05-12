package codesquad.issuetracker.milestone;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class MilestoneServiceTest {

    @Mock
    private MilestoneRepository milestoneRepository;
    @InjectMocks
    private MilestoneService milestoneService;


    @Test
    @DisplayName("모든 milstone에 대한 정보를 불러오는 메서드 테스트")
    void testFindAll() {
        Milestone milestone1 = Milestone.builder()
            .title("테스트 마일스톤")
            .description("테스트 내용")
            .dueDate(null)
            .openAt(null)
            .isOpen(true)
            .isDeleted(false)
            .updatedAt(null)
            .build();
        Milestone milestone2 = Milestone.builder()
            .title("테스트 마일스톤2")
            .description("테스트 내용2")
            .dueDate(null)
            .openAt(null)
            .isOpen(true)
            .isDeleted(false)
            .updatedAt(null)
            .build();

        when(milestoneRepository.findAll()).thenReturn(
            List.of(milestone1, milestone2));

        List<Milestone> fetchedAllMilestones = milestoneService.fetchAllMilestones();
        assertThat(fetchedAllMilestones).containsExactly(milestone1, milestone2);
    }
}
