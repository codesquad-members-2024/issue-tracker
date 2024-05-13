package com.issuetracker.domain.label;

import com.issuetracker.domain.label.request.LabelCreateRequest;
import com.issuetracker.domain.label.response.LabelResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LabelService {

    private final LabelRepository labelRepository;

    public String create(LabelCreateRequest labelCreateRequest) {
        labelRepository.findById(labelCreateRequest.getLabelId())
                .ifPresent(label -> {
                    throw new DuplicateKeyException("이미 존재하는 레이블입니다.");
                });
        Label label = labelCreateRequest.toEntity();
        Label savedLabel = labelRepository.save(label);
        return savedLabel.getId();
    }

    public LabelResponse.Labels getLabels() {
        List<Label> labels = labelRepository.findAllLabels();
        return LabelResponse.Labels.of(
                labels.stream().map(LabelResponse.Element::of).collect(Collectors.toList())
        );
    }
}
