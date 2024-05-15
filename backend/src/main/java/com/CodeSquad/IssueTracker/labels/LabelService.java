package com.CodeSquad.IssueTracker.labels;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LabelService {

    @Autowired
    private LabelRepository labelRepository;

    public List<Label> getAllLabels() {
        return (List<Label>) labelRepository.findAll();
    }

    public Optional<Label> getLabelById(Long id) {
        return labelRepository.findById(id);
    }

    public Label createLabel(Label label) {
        label.setNew(true);
        return labelRepository.save(label);
    }

}