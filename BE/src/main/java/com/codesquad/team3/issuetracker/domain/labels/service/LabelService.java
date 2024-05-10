package com.codesquad.team3.issuetracker.domain.labels.service;

import com.codesquad.team3.issuetracker.domain.labels.dto.Label;
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

    public void update(Long id, Label label){
//        labelRepository.(id, label);
    }
//
//    public void delete(Long id){
//        labelRepository.delete(id);
//    }
//
//
//    public Label getLabel(Long id) {
//        return labelRepository.findById(id);
//
//
//    }
}
