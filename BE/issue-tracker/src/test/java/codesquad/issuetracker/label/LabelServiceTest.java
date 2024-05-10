package codesquad.issuetracker.label;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.Mockito.when;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class LabelServiceTest {


    @Mock
    private LabelRepository labelRepository;

    @InjectMocks
    private LabelService labelService;

    @Test
    @DisplayName("모든 라벨에 대한 정보를 불러오는 테스트")
    void testFindAllLabels() {
        Label label1 = Label.builder()
            .name("테스트 라벨")
            .description("테스트 내용")
            .color("#FF0000")
            .build();

        Label label2 = Label.builder()
            .name("테스트 라벨2")
            .description("테스트 내용2")
            .color("#DC143C")
            .build();

        when(labelRepository.findAll()).thenReturn(
            List.of(label1, label2));

        List<Label> fetchedAllLabels = labelService.fetchAllLabels();
        assertThat(fetchedAllLabels).containsExactly(label1, label2);

    }
}
