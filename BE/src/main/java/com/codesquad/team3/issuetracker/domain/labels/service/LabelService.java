package com.codesquad.team3.issuetracker.domain.labels.service;

import com.codesquad.team3.issuetracker.domain.labels.entity.Label;
import com.codesquad.team3.issuetracker.domain.labels.repository.LabelRepository;
import org.springframework.stereotype.Service;


@Service
public class LabelService {

    private final LabelRepository labelRepository;


    public LabelService(LabelRepository labelRepository) {
        this.labelRepository = labelRepository;
    }

    public void create(Label label){
        labelRepository.save(label);
    }

    public void update(String title, Label updateLabel){
        labelRepository.updateByTitle(title,
                updateLabel.getDescription(),
                updateLabel.getColor(),
                updateLabel.getTitle());
    }

    public void delete(String id){
        labelRepository.deleteById(id);
    }


    public Label getLabel(String id) {
        return labelRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    }
}
