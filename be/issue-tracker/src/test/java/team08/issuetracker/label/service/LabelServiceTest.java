package team08.issuetracker.label.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import team08.issuetracker.exception.label.LabelNotFoundException;
import team08.issuetracker.label.model.Label;
import team08.issuetracker.label.model.dto.LabelCreationRequest;
import team08.issuetracker.label.repository.LabelRepository;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class LabelServiceTest {

    @Autowired
    private LabelService labelService;

    @MockBean
    private LabelRepository labelRepository;

    @Test
    @DisplayName("라벨이 성공적으로 생성되어야 한다.")
    void testCreateLabel() {
        LabelCreationRequest labelCreationRequest = new LabelCreationRequest("New Label", "New Description", "#FFFFFF", true);
        Label expectedLabel = new Label("New Label", "New Description", "#FFFFFF", true);

        when(labelRepository.save(any(Label.class))).thenReturn(expectedLabel);

        Label createdLabel = labelService.createLabel(labelCreationRequest);

        assertThat(createdLabel.getName()).isEqualTo("New Label");
    }

    @Test
    @DisplayName("주어진 아이디로 라벨을 찾을 수 없을 때, LabelNotFoundException을 던져야 한다.")
    void testLabelNotFound() {
        when(labelRepository.findById(1L)).thenReturn(Optional.empty());

        Assertions.assertThrows(LabelNotFoundException.class, () -> {
            labelService.getLabel(1L);
        });
    }

    @Test
    @DisplayName("주어진 아이디에 해당하는 라벨을 성공적으로 삭제해야 한다.")
    void testDeleteLabel() {
        Long id = 1L;
        Label labelToDelete = new Label("Name", "Description", "#FFFFFF", true);

        when(labelRepository.findById(id)).thenReturn(Optional.of(labelToDelete));

        labelService.deleteLabel(id);

        verify(labelRepository).delete(labelToDelete);
    }
}
