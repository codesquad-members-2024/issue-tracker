package com.issuetracker.domain.label;

import com.issuetracker.domain.label.request.LabelCreateRequest;
import com.issuetracker.domain.label.response.LabelResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LabelService {

    private final LabelRepository labelRepository;

    public void create(LabelCreateRequest labelCreateRequest) {
        Label label = labelCreateRequest.toEntity();
        labelRepository.save(label);
    }

    public LabelResponse.Labels getLabels() {
        List<Label> labels = labelRepository.findAllLabels();
        return LabelResponse.Labels.of(
                labels.stream().map(LabelResponse.Element::of).collect(Collectors.toList())
        );
    }
}
