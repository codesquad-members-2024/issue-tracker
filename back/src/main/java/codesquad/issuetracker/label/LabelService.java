package codesquad.issuetracker.label;

import codesquad.issuetracker.exception.LabelNotFoundException;
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
        return labelRepository.findById(labelId).orElseThrow(() -> new LabelNotFoundException("존재하지 않는 라벨 입니다."));
    }

    public Label updateLabelById(Label updatedLabel) {
        return labelRepository.save(updatedLabel);
    }

    public void deleteLabelById(Long labelId) {
        labelRepository.deleteById(labelId);
    }
}
