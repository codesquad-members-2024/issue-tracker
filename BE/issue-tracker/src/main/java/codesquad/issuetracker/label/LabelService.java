package codesquad.issuetracker.label;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LabelService {

    private final LabelRepository labelRepository;

    public List<Label> fetchFilteredLabels(Pageable pageable) {
        Page<Label> filteredLabels = labelRepository.findAll(pageable);
        return filteredLabels.getContent();

    }

    public Label findById(Long labelId) {
        Optional<Label> optionalLabel = labelRepository.findById(labelId);
        return optionalLabel.orElseThrow(NoSuchElementException::new);
    }

    public Long countLabels() {
        return labelRepository.countLabels();
    }
}
