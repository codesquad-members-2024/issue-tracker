package codesquad.issuetracker.label;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LabelService {

    private final LabelRepository labelRepository;

    public List<Label> fetchAllLabels() {
        return (List<Label>) labelRepository.findAll();
    }
}
