package codesquad.issuetracker.label;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LabelService {

    private final LabelRepository labelRepository;

    public Label createLabel(Label label) {
        return labelRepository.save(label);
    }

    public List<Label> getAllLabels() {
        return labelRepository.findAll();
    }

    public Label getLabelById(Long labelId) {
        return labelRepository.findById(labelId).orElseThrow(RuntimeException::new);
    }

    public void updateLabelById(Label updatedLabel) {
        labelRepository.save(updatedLabel);
    }

    public void deleteLabelById(Long labelId) {
        labelRepository.deleteById(labelId);
    }
}
