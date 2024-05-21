package team08.issuetracker.label.service;

import org.junit.jupiter.api.Assertions;
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
    void testCreateLabel() {
        LabelCreationRequest labelCreationRequest = new LabelCreationRequest("New Label", "New Description", "#FFFFFF", "#000000");
        Label expectedLabel = new Label("New Label", "New Description", "#FFFFFF", "#000000");

        when(labelRepository.save(any(Label.class))).thenReturn(expectedLabel);

        Label createdLabel = labelService.createLabel(labelCreationRequest);

        assertThat(createdLabel.getName()).isEqualTo("New Label");
    }

    @Test
    void testLabelNotFound() {
        when(labelRepository.findById(1L)).thenReturn(Optional.empty());

        Assertions.assertThrows(LabelNotFoundException.class, () -> {
            labelService.getLabel(1L);
        });
    }

    @Test
    void testDeleteLabel() {
        Long id = 1L;
        Label labelToDelete = new Label("Name", "Description", "#FFFFFF", "#000000");

        when(labelRepository.findById(id)).thenReturn(Optional.of(labelToDelete));

        labelService.deleteLabel(id);

        verify(labelRepository).delete(labelToDelete);
    }
}
