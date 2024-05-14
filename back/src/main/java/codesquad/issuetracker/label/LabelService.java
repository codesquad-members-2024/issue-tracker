package codesquad.issuetracker.label;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LabelService {

    private final LabelRepository labelRepository;

    public void createLabel(Label label) {
        labelRepository.insert(label.getName(), label.getDescription(), label.getColor());
    }
}
