package com.issuetracker.domain.label;

import com.issuetracker.domain.label.request.LabelCreateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LabelService {

    private final LabelRepository labelRepository;

    public void create(LabelCreateRequest labelCreateRequest) {
        Label label = labelCreateRequest.toEntity();
        labelRepository.save(label);
    }
}
