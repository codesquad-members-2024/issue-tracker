package codesquad.issuetracker.label;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LabelService {

    private final LabelRepository labelRepository;

    public void createLabel(Label label) {
        labelRepository.save(label);
    }

    public List<Label> getAllLabels() {
        return (List<Label>) labelRepository.findAll();
    }

    public Label getLabelById(Long labelId) {
        return labelRepository.findById(labelId).orElseThrow(RuntimeException::new);
    }

    public void updateLabelById(Long labelId, String name, String description, String backgroundColor, String textColor) {
        labelRepository.updateById(labelId, name, description, backgroundColor, textColor);
    }

    public void deleteLabelById(Long labelId) {
        labelRepository.deleteById(labelId);
    }
}
