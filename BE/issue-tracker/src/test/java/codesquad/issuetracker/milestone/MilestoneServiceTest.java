package codesquad.issuetracker.milestone;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@ExtendWith(MockitoExtension.class)
class MilestoneServiceTest {

    @Mock
    private MilestoneRepository milestoneRepository;
    @Mock
    private MilestoneCustomRepository milestoneCustomRepository;
    @InjectMocks
    private MilestoneService milestoneService;


    @Test
    @DisplayName("없는 마일스톤을 삭제하는 테스트")
    void testSoftDeleteByMilestoneId_NotFound() {
        //given
        when(milestoneRepository.findById(anyLong())).thenReturn(Optional.empty());

        //when
        ResponseEntity<String> response = milestoneService.softDeleteByMilestoneId(1L);

        //then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody()).isEqualTo("Milestone not found");

    }


    @Test
    @DisplayName("이미 삭제된 마일스톤을 삭제하는 테스트")
    void testSoftDeleteByMilestoneId_BadRequest() {

        //given
        Milestone milestone = Milestone.builder()
            .id(1L)
            .title("테스트 마일스톤")
            .isDeleted(true)
            .build();
        when(milestoneRepository.findById(anyLong())).thenReturn(Optional.of(milestone));

        //when
        ResponseEntity<String> response = milestoneService.softDeleteByMilestoneId(1L);

        //then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).isEqualTo("Milestone is already deleted");
    }

    @Test
    @DisplayName("마일스톤 삭제에 성공하는 테스트")
    void testSoftDeleteByMilestoneId_OK() {
        //given
        Milestone milestone = Milestone.builder()
            .id(1L)
            .title("테스트 마일스톤")
            .isDeleted(false)
            .build();
        when(milestoneRepository.findById(anyLong())).thenReturn(Optional.of(milestone));

        //when
        ResponseEntity<String> response = milestoneService.softDeleteByMilestoneId(1L);

        //then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo("Milestone is successfully deleted");
    }

}
